const STORE_KEY = "youtube-kanban:v1";

const DEFAULT_COLUMNS = [
  { id: "idea", name: "Fikir" },
  { id: "packaging", name: "Paket" },
  { id: "script", name: "Senaryo" },
  { id: "film", name: "Çekim" },
  { id: "edit", name: "Kurgu" },
  { id: "ready", name: "Hazır" },
  { id: "published", name: "Yayınlandı" },
];

const DEFAULT_CHECKS = [
  "Başlık son hali",
  "Thumbnail telefon boyutu",
  "Açıklama + chapters",
  "Etiketler",
  "End screen / cards",
  "Sabitlenmiş yorum",
];

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const now = () => new Date().toISOString();

function defaultChecklist() {
  return DEFAULT_CHECKS.map((text) => ({ id: uid(), text, done: false }));
}

function normalizeCard(raw, i = 0) {
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map(String).slice(0, 16)
    : String(raw.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 16);

  let checklist = Array.isArray(raw.checklist)
    ? raw.checklist
        .filter((x) => x && typeof x.text === "string")
        .map((x) => ({ id: x.id || uid(), text: String(x.text), done: !!x.done }))
    : defaultChecklist();

  return {
    id: typeof raw.id === "string" ? raw.id : uid(),
    title: String(raw.title || "Başlıksız").trim().slice(0, 120),
    status: String(raw.status || "idea"),
    order: Number.isFinite(raw.order) ? raw.order : i,
    format: raw.format === "short" ? "short" : "long",
    priority: ["low", "med", "high"].includes(raw.priority) ? raw.priority : "med",
    hook: String(raw.hook || ""),
    titles: String(raw.titles || ""),
    keyword: String(raw.keyword || ""),
    description: String(raw.description || ""),
    tags,
    thumbnail: String(raw.thumbnail || ""),
    cta: String(raw.cta || ""),
    script: String(raw.script || ""),
    notes: String(raw.notes || ""),
    publishAt: String(raw.publishAt || "").slice(0, 10),
    checklist,
    archived: !!raw.archived,
    createdAt: raw.createdAt || now(),
    updatedAt: raw.updatedAt || now(),
  };
}

function seedCards() {
  const t = now();
  return [
    normalizeCard({
      title: "Android’de NFC ile ödeme — 5 dakika",
      status: "idea",
      format: "long",
      priority: "high",
      keyword: "nfc ödeme android",
      hook: "Cüzdan çıkarmadan ödeme mümkün mü?",
      notes: "- NFC nedir\n- Güvenlik katmanı\n- Canlı demo",
      tags: ["android", "nfc"],
      createdAt: t,
      updatedAt: t,
    }),
    normalizeCard({
      title: "Seyahat bütçesi: şehir hafta sonu",
      status: "packaging",
      format: "long",
      priority: "med",
      keyword: "hafta sonu seyahat bütçesi",
      titles: "Şehir kaçamağı: gerçekçi bütçe\n3 günde ne kadar harcadım?",
      thumbnail: "Harita + fiyat etiketi, yüksek kontrast",
      notes: "1) Ulaşım 2) Konaklama 3) Yemek 4) Tuzağa düşme",
      tags: ["seyahat", "finans"],
      publishAt: new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10),
      createdAt: t,
      updatedAt: t,
    }),
    normalizeCard({
      title: "Flutter vs Compose — 60 sn",
      status: "script",
      format: "short",
      priority: "med",
      hook: "Hangisini seçmeli? 60 saniyede net cevap.",
      script: "Hook → 3 fark → karar çerçevesi → CTA",
      tags: ["flutter", "compose"],
      createdAt: t,
      updatedAt: t,
    }),
  ];
}

function migrate(parsed) {
  const columns =
    Array.isArray(parsed.columns) && parsed.columns.length
      ? parsed.columns
          .filter((c) => c && c.id && c.name)
          .map((c) => ({ id: String(c.id), name: String(c.name).slice(0, 40) }))
      : DEFAULT_COLUMNS.map((c) => ({ ...c }));

  const colIds = new Set(columns.map((c) => c.id));
  const fallback = columns[0]?.id || "idea";

  const cards = (Array.isArray(parsed.cards) ? parsed.cards : [])
    .filter((c) => c && (c.title || c.notes))
    .map((c, i) => {
      const card = normalizeCard(c, i);
      // v1 column remap
      const map = { outline: "packaging", ready: "ready", published: "published", idea: "idea", script: "script" };
      if (!colIds.has(card.status)) card.status = map[card.status] && colIds.has(map[card.status]) ? map[card.status] : fallback;
      return card;
    });

  return {
    version: 2,
    view: parsed.view === "calendar" ? "calendar" : "board",
    columns,
    cards: cards.length ? cards : seedCards(),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      const fresh = migrate({ version: 2, columns: DEFAULT_COLUMNS, cards: seedCards() });
      saveState(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw);
    const state = migrate(parsed || {});
    if (!parsed.version || parsed.version < 2 || !Array.isArray(parsed.columns)) saveState(state);
    return state;
  } catch {
    const fresh = migrate({ version: 2, columns: DEFAULT_COLUMNS, cards: seedCards() });
    saveState(fresh);
    return fresh;
  }
}

function saveState(s) {
  localStorage.setItem(
    STORE_KEY,
    JSON.stringify({
      version: 2,
      view: s.view,
      columns: s.columns,
      cards: s.cards,
    }),
  );
}

let state = loadState();
let editingId = null;
let dragId = null;
let colDragId = null;
let filters = { q: "", format: "", priority: "", archive: false };

const boardEl = document.getElementById("board");
const calendarEl = document.getElementById("calendar");
const statsEl = document.getElementById("stats");
const drawerEl = document.getElementById("drawer");
const colDrawerEl = document.getElementById("colDrawer");
const formEl = document.getElementById("cardForm");
const checklistEl = document.getElementById("checklist");

const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseTags(raw) {
  return String(raw || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 16);
}

function columnById(id) {
  return state.columns.find((c) => c.id === id) || state.columns[0];
}

function visibleCards() {
  const q = filters.q.trim().toLocaleLowerCase("tr");
  return state.cards.filter((c) => {
    if (!filters.archive && c.archived) return false;
    if (filters.format && c.format !== filters.format) return false;
    if (filters.priority && c.priority !== filters.priority) return false;
    if (!q) return true;
    const blob = [c.title, c.hook, c.notes, c.script, c.description, c.keyword, c.cta, ...(c.tags || [])]
      .join(" ")
      .toLocaleLowerCase("tr");
    return blob.includes(q);
  });
}

function cardsIn(status) {
  return visibleCards()
    .filter((c) => c.status === status)
    .sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt));
}

function weekAgoMs() {
  return Date.now() - 7 * 24 * 60 * 60 * 1000;
}

function checkProgress(card) {
  const list = card.checklist || [];
  if (!list.length) return 0;
  return list.filter((x) => x.done).length / list.length;
}

function renderStats() {
  const all = visibleCards();
  const week = all.filter((c) => new Date(c.createdAt).getTime() >= weekAgoMs()).length;
  const due = all.filter((c) => c.publishAt).length;
  const bits = [
    `<span class="stat accent">Aktif <b>${all.filter((c) => !c.archived).length}</b></span>`,
    `<span class="stat">Bu hafta <b>${week}</b></span>`,
    `<span class="stat">Tarihli <b>${due}</b></span>`,
    ...state.columns.map((col) => `<span class="stat">${escapeHtml(col.name)} <b>${cardsIn(col.id).length}</b></span>`),
  ];
  statsEl.innerHTML = bits.join("");
}

function cardHTML(card) {
  const preview = (card.hook || card.notes || card.script || "").trim();
  const pct = Math.round(checkProgress(card) * 100);
  const tags = (card.tags || []).slice(0, 3).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  return `
    <button type="button" class="card" draggable="true" data-id="${card.id}">
      <div class="card-top">
        <h3>${escapeHtml(card.title)}</h3>
        <span class="prio ${card.priority}">${card.priority === "high" ? "Yüksek" : card.priority === "low" ? "Düşük" : "Orta"}</span>
      </div>
      ${preview ? `<p>${escapeHtml(preview)}</p>` : ""}
      <div class="meta">
        <span class="chip format">${card.format === "short" ? "Shorts" : "Uzun"}</span>
        ${card.publishAt ? `<span class="chip date">${escapeHtml(card.publishAt)}</span>` : ""}
        ${pct ? `<span class="chip check">${pct}%</span>` : ""}
        ${tags}
      </div>
      ${card.checklist?.length ? `<div class="progress" aria-hidden="true"><i style="width:${pct}%"></i></div>` : ""}
    </button>
  `;
}

function renderBoard() {
  boardEl.innerHTML = state.columns
    .map((col) => {
      const list = cardsIn(col.id);
      return `
      <section class="column" data-status="${col.id}">
        <div class="column-head">
          <h2>${escapeHtml(col.name)}</h2>
          <span class="count">${list.length}</span>
        </div>
        <div class="column-body" data-drop="${col.id}">
          ${list.length === 0 ? `<div class="column-empty">Kart yok</div>` : ""}
          ${list.map(cardHTML).join("")}
        </div>
      </section>`;
    })
    .join("");

  boardEl.style.gridTemplateColumns = `repeat(${state.columns.length}, minmax(260px, 1fr))`;

  boardEl.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => openDrawer(el.dataset.id));
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("dragend", onDragEnd);
  });
  boardEl.querySelectorAll("[data-drop]").forEach((zone) => {
    zone.addEventListener("dragover", onDragOver);
    zone.addEventListener("dragleave", onDragLeave);
    zone.addEventListener("drop", onDrop);
  });
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function renderCalendar() {
  const base = new Date();
  const start = startOfMonth(base);
  const startPad = (start.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  const heads = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => `<div class="cal-head">${d}</div>`).join("");

  const byDate = {};
  visibleCards().forEach((c) => {
    if (!c.publishAt) return;
    (byDate[c.publishAt] ||= []).push(c);
  });

  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(`<div class="cal-day muted"></div>`);
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const today = iso === new Date().toISOString().slice(0, 10);
    const items = byDate[iso] || [];
    cells.push(`
      <div class="cal-day ${today ? "today" : ""}">
        <div class="num">${day}</div>
        ${items
          .map(
            (c) =>
              `<button type="button" class="cal-pill" data-id="${c.id}">${escapeHtml(c.title)}</button>`,
          )
          .join("")}
      </div>
    `);
  }

  const undated = visibleCards().filter((c) => !c.publishAt && !c.archived);
  calendarEl.innerHTML = `
    <div class="cal-grid">${heads}${cells.join("")}</div>
    ${
      undated.length
        ? `<p class="cal-empty">${undated.length} videoda yayın tarihi yok — karttan ekle.</p>`
        : ""
    }
  `;
  calendarEl.querySelectorAll(".cal-pill").forEach((el) => {
    el.addEventListener("click", () => openDrawer(el.dataset.id));
  });
}

function setView(view) {
  state.view = view;
  saveState(state);
  $("viewBoard").classList.toggle("on", view === "board");
  $("viewCal").classList.toggle("on", view === "calendar");
  boardEl.hidden = view !== "board";
  calendarEl.hidden = view !== "calendar";
  render();
}

function render() {
  renderStats();
  if (state.view === "calendar") renderCalendar();
  else renderBoard();
}

function fillStatusOptions(selected) {
  $("fieldStatus").innerHTML = state.columns
    .map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${escapeHtml(c.name)}</option>`)
    .join("");
}

function renderChecklist(list) {
  checklistEl.innerHTML = (list || [])
    .map(
      (item) => `
    <li data-id="${item.id}">
      <input type="checkbox" ${item.done ? "checked" : ""} data-check="${item.id}" />
      <input type="text" value="${escapeHtml(item.text)}" data-check-text="${item.id}" />
      <button type="button" class="x" data-check-del="${item.id}" aria-label="Sil">×</button>
    </li>`,
    )
    .join("");
}

function readChecklist() {
  return [...checklistEl.querySelectorAll("li")].map((li) => ({
    id: li.dataset.id,
    done: !!li.querySelector('input[type="checkbox"]').checked,
    text: li.querySelector('input[type="text"]').value.trim() || "Madde",
  }));
}

function setTab(name) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.tab === name));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("on", p.dataset.panel === name));
}

function openDrawer(id) {
  editingId = id || null;
  const card = id ? state.cards.find((c) => c.id === id) : null;
  $("drawerTitle").textContent = card ? card.title : "Yeni video";
  $("drawerEyebrow").textContent = card ? columnById(card.status)?.name || "Video" : "Yeni kart";
  $("fieldTitle").value = card?.title || "";
  $("fieldHook").value = card?.hook || "";
  $("fieldTitles").value = card?.titles || "";
  $("fieldKeyword").value = card?.keyword || "";
  $("fieldThumb").value = card?.thumbnail || "";
  $("fieldCta").value = card?.cta || "";
  $("fieldNotes").value = card?.notes || "";
  $("fieldScript").value = card?.script || "";
  $("fieldDesc").value = card?.description || "";
  $("fieldTags").value = card ? (card.tags || []).join(", ") : "";
  $("fieldPublish").value = card?.publishAt || "";
  $("fieldFormat").value = card?.format || "long";
  $("fieldPriority").value = card?.priority || "med";
  $("fieldArchive").checked = !!card?.archived;
  fillStatusOptions(card?.status || state.columns[0]?.id);
  renderChecklist(card?.checklist?.length ? card.checklist : defaultChecklist());
  $("btnDelete").hidden = !card;
  $("btnDup").hidden = !card;
  updateCounts();
  setTab("genel");
  drawerEl.hidden = false;
  $("fieldTitle").focus();
}

function closeDrawer() {
  drawerEl.hidden = true;
  editingId = null;
}

function nextOrder(status) {
  const list = state.cards.filter((c) => c.status === status);
  return list.length ? Math.max(...list.map((c) => c.order)) + 1 : 0;
}

function updateCounts() {
  const t = $("fieldTitle").value.length;
  $("titleCount").textContent = `${t} / 100  ·  aramada ~60 görünür`;
  $("descCount").textContent = `${$("fieldDesc").value.length} karakter · ilk 150 kritik`;
}

function saveCard(e) {
  e.preventDefault();
  const title = $("fieldTitle").value.trim();
  if (!title) return;
  const status = $("fieldStatus").value;
  const t = now();
  const payload = {
    title,
    status,
    format: $("fieldFormat").value,
    priority: $("fieldPriority").value,
    hook: $("fieldHook").value,
    titles: $("fieldTitles").value,
    keyword: $("fieldKeyword").value.trim(),
    thumbnail: $("fieldThumb").value,
    cta: $("fieldCta").value.trim(),
    notes: $("fieldNotes").value,
    script: $("fieldScript").value,
    description: $("fieldDesc").value,
    tags: parseTags($("fieldTags").value),
    publishAt: $("fieldPublish").value,
    checklist: readChecklist(),
    archived: $("fieldArchive").checked,
    updatedAt: t,
  };

  if (editingId) {
    state.cards = state.cards.map((c) => {
      if (c.id !== editingId) return c;
      const moved = c.status !== status;
      return normalizeCard({
        ...c,
        ...payload,
        order: moved ? nextOrder(status) : c.order,
        createdAt: c.createdAt,
      });
    });
  } else {
    state.cards.push(
      normalizeCard({
        ...payload,
        id: uid(),
        order: nextOrder(status),
        createdAt: t,
      }),
    );
  }
  saveState(state);
  closeDrawer();
  render();
}

function deleteCard() {
  if (!editingId) return;
  if (!confirm("Bu video kartı silinsin mi?")) return;
  state.cards = state.cards.filter((c) => c.id !== editingId);
  saveState(state);
  closeDrawer();
  render();
}

function duplicateCard() {
  if (!editingId) return;
  const src = state.cards.find((c) => c.id === editingId);
  if (!src) return;
  const copy = normalizeCard({
    ...src,
    id: uid(),
    title: `${src.title} (kopya)`,
    status: state.columns[0]?.id || src.status,
    order: nextOrder(state.columns[0]?.id || src.status),
    archived: false,
    createdAt: now(),
    updatedAt: now(),
  });
  state.cards.push(copy);
  saveState(state);
  closeDrawer();
  openDrawer(copy.id);
  render();
}

function onDragStart(e) {
  dragId = e.currentTarget.dataset.id;
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", dragId);
}

function onDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  boardEl.querySelectorAll(".drag-over").forEach((z) => z.classList.remove("drag-over"));
  dragId = null;
}

function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
  e.dataTransfer.dropEffect = "move";
}

function onDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  const id = dragId || e.dataTransfer.getData("text/plain");
  const status = e.currentTarget.dataset.drop;
  if (!id || !status) return;
  const card = state.cards.find((c) => c.id === id);
  if (!card) return;

  const afterEl = [...e.currentTarget.querySelectorAll(".card")].find((el) => {
    const rect = el.getBoundingClientRect();
    return e.clientY < rect.top + rect.height / 2;
  });

  const siblings = state.cards.filter((c) => c.status === status && c.id !== id).sort((a, b) => a.order - b.order);
  let insertAt = siblings.length;
  if (afterEl) {
    const idx = siblings.findIndex((c) => c.id === afterEl.dataset.id);
    if (idx >= 0) insertAt = idx;
  }

  const moved = { ...card, status, updatedAt: now() };
  const reordered = [...siblings];
  reordered.splice(insertAt, 0, moved);
  reordered.forEach((c, i) => {
    c.order = i;
  });

  const others = state.cards.filter((c) => c.status !== status && c.id !== id);
  state.cards = [...others, ...reordered];
  saveState(state);
  render();
}

/* Columns manager */
function openColDrawer() {
  renderColList();
  colDrawerEl.hidden = false;
}

function closeColDrawer() {
  colDrawerEl.hidden = true;
  render();
}

function renderColList() {
  $("colList").innerHTML = state.columns
    .map(
      (c, i) => `
    <li class="col-item" draggable="true" data-col="${c.id}">
      <span class="grip" title="Sürükle">⋮⋮</span>
      <input type="text" value="${escapeHtml(c.name)}" data-col-name="${c.id}" maxlength="40" />
      <button type="button" class="ghost tiny" data-col-up="${c.id}" ${i === 0 ? "disabled" : ""}>↑</button>
      <button type="button" class="danger tiny" data-col-del="${c.id}" ${state.columns.length <= 1 ? "disabled" : ""}>Sil</button>
    </li>`,
    )
    .join("");

  $("colList").querySelectorAll(".col-item").forEach((el) => {
    el.addEventListener("dragstart", (e) => {
      colDragId = el.dataset.col;
      e.dataTransfer.effectAllowed = "move";
    });
    el.addEventListener("dragover", (e) => e.preventDefault());
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      const to = el.dataset.col;
      if (!colDragId || colDragId === to) return;
      const from = state.columns.findIndex((c) => c.id === colDragId);
      const dest = state.columns.findIndex((c) => c.id === to);
      if (from < 0 || dest < 0) return;
      const [item] = state.columns.splice(from, 1);
      state.columns.splice(dest, 0, item);
      saveState(state);
      renderColList();
    });
  });
}

function exportJSON() {
  const blob = new Blob(
    [JSON.stringify({ version: 2, view: state.view, columns: state.columns, cards: state.cards }, null, 2)],
    { type: "application/json" },
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `kare-pipeline-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      const next = migrate(data);
      if (!confirm(`${next.cards.length} kart / ${next.columns.length} sütun içe aktarılsın mı?`)) return;
      state = next;
      saveState(state);
      setView(state.view);
    } catch {
      alert("JSON okunamadı.");
    }
  };
  reader.readAsText(file);
}

/* Events */
$("btnNew").addEventListener("click", () => openDrawer(null));
$("btnClose").addEventListener("click", closeDrawer);
$("btnCancel").addEventListener("click", closeDrawer);
$("btnDelete").addEventListener("click", deleteCard);
$("btnDup").addEventListener("click", duplicateCard);
$("btnExport").addEventListener("click", exportJSON);
$("btnColumns").addEventListener("click", openColDrawer);
$("btnColClose").addEventListener("click", closeColDrawer);
$("viewBoard").addEventListener("click", () => setView("board"));
$("viewCal").addEventListener("click", () => setView("calendar"));

$("importFile").addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (file) importJSON(file);
  e.target.value = "";
});

formEl.addEventListener("submit", saveCard);
$("fieldTitle").addEventListener("input", updateCounts);
$("fieldDesc").addEventListener("input", updateCounts);

$("btnAddCheck").addEventListener("click", () => {
  const list = readChecklist();
  list.push({ id: uid(), text: "Yeni madde", done: false });
  renderChecklist(list);
});

checklistEl.addEventListener("click", (e) => {
  const del = e.target.closest("[data-check-del]");
  if (!del) return;
  const list = readChecklist().filter((x) => x.id !== del.dataset.checkDel);
  renderChecklist(list);
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

$("search").addEventListener("input", (e) => {
  filters.q = e.target.value;
  render();
});
$("filterFormat").addEventListener("change", (e) => {
  filters.format = e.target.value;
  render();
});
$("filterPriority").addEventListener("change", (e) => {
  filters.priority = e.target.value;
  render();
});
$("filterArchive").addEventListener("change", (e) => {
  filters.archive = e.target.checked;
  render();
});

$("colList").addEventListener("change", (e) => {
  const input = e.target.closest("[data-col-name]");
  if (!input) return;
  const col = state.columns.find((c) => c.id === input.dataset.colName);
  if (col) {
    col.name = input.value.trim().slice(0, 40) || col.name;
    saveState(state);
  }
});

$("colList").addEventListener("click", (e) => {
  const up = e.target.closest("[data-col-up]");
  const del = e.target.closest("[data-col-del]");
  if (up) {
    const i = state.columns.findIndex((c) => c.id === up.dataset.colUp);
    if (i > 0) {
      [state.columns[i - 1], state.columns[i]] = [state.columns[i], state.columns[i - 1]];
      saveState(state);
      renderColList();
    }
  }
  if (del) {
    if (state.columns.length <= 1) return;
    const id = del.dataset.colDel;
    if (!confirm(`“${columnById(id)?.name}” silinsin mi? Kartlar ilk sütuna taşınır.`)) return;
    const fallback = state.columns.find((c) => c.id !== id)?.id;
    state.columns = state.columns.filter((c) => c.id !== id);
    state.cards.forEach((c) => {
      if (c.status === id) {
        c.status = fallback;
        c.order = nextOrder(fallback);
      }
    });
    saveState(state);
    renderColList();
  }
});

$("btnAddCol").addEventListener("click", () => {
  const name = prompt("Sütun adı", "Yeni aşama");
  if (!name) return;
  state.columns.push({ id: `col-${uid().slice(0, 8)}`, name: name.trim().slice(0, 40) });
  saveState(state);
  renderColList();
});

$("btnResetCols").addEventListener("click", () => {
  if (!confirm("Varsayılan 7 aşamalı pipeline’a dönülsün mü?")) return;
  const map = {
    idea: "idea",
    packaging: "packaging",
    outline: "packaging",
    script: "script",
    film: "film",
    edit: "edit",
    ready: "ready",
    published: "published",
  };
  state.columns = DEFAULT_COLUMNS.map((c) => ({ ...c }));
  state.cards.forEach((c) => {
    c.status = map[c.status] || "idea";
  });
  saveState(state);
  renderColList();
});

drawerEl.addEventListener("click", (e) => {
  if (e.target === drawerEl) closeDrawer();
});
colDrawerEl.addEventListener("click", (e) => {
  if (e.target === colDrawerEl) closeColDrawer();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!drawerEl.hidden) closeDrawer();
    else if (!colDrawerEl.hidden) closeColDrawer();
  }
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
  if (e.key === "n" || e.key === "N") {
    e.preventDefault();
    openDrawer(null);
  }
  if (e.key === "/") {
    e.preventDefault();
    $("search").focus();
  }
});

setView(state.view);
