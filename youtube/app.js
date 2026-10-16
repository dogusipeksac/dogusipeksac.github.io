const STORE_KEY = "youtube-kanban:v1";

const COLUMNS = [
  { id: "idea", name: "Fikir", hint: "Ham başlık" },
  { id: "outline", name: "Outline", hint: "Ana maddeler" },
  { id: "script", name: "Senaryo", hint: "Konuşma / çekim" },
  { id: "ready", name: "Hazır", hint: "Başlık & etiket" },
  { id: "published", name: "Yayınlandı", hint: "Yayın notu" },
];

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const now = () => new Date().toISOString();

function seedCards() {
  const t = now();
  return [
    {
      id: uid(),
      title: "Android’de NFC ile ödeme — 5 dakika",
      notes: "Hook: cüzdan açmadan ödeme\n- NFC nedir\n- Güvenlik\n- Demo ekranı",
      tags: ["android", "nfc"],
      status: "idea",
      order: 0,
      createdAt: t,
      updatedAt: t,
    },
    {
      id: uid(),
      title: "Seyahat bütçesi: şehir hafta sonu",
      notes: "1) Ulaşım 2) Konaklama 3) Yemek 4) Kaçınılacaklar",
      tags: ["seyahat", "finans"],
      status: "outline",
      order: 0,
      createdAt: t,
      updatedAt: t,
    },
  ];
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      const fresh = { version: 1, cards: seedCards() };
      localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cards)) {
      const fresh = { version: 1, cards: seedCards() };
      localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return { version: 1, cards: parsed.cards };
  } catch {
    const fresh = { version: 1, cards: seedCards() };
    localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

function saveState(state) {
  localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, cards: state.cards }));
}

let state = loadState();
let editingId = null;
let dragId = null;

const boardEl = document.getElementById("board");
const statsEl = document.getElementById("stats");
const modalEl = document.getElementById("modal");
const formEl = document.getElementById("cardForm");
const fieldTitle = document.getElementById("fieldTitle");
const fieldStatus = document.getElementById("fieldStatus");
const fieldTags = document.getElementById("fieldTags");
const fieldNotes = document.getElementById("fieldNotes");
const btnDelete = document.getElementById("btnDelete");
const modalTitle = document.getElementById("modalTitle");

function parseTags(raw) {
  return String(raw || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function cardsIn(status) {
  return state.cards
    .filter((c) => c.status === status)
    .sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt));
}

function weekAgoMs() {
  return Date.now() - 7 * 24 * 60 * 60 * 1000;
}

function renderStats() {
  const total = state.cards.length;
  const week = state.cards.filter((c) => new Date(c.createdAt).getTime() >= weekAgoMs()).length;
  const bits = [
    `<span class="stat accent">Toplam <b>${total}</b></span>`,
    `<span class="stat">Bu hafta <b>${week}</b></span>`,
    ...COLUMNS.map((col) => {
      const n = cardsIn(col.id).length;
      return `<span class="stat">${col.name} <b>${n}</b></span>`;
    }),
  ];
  statsEl.innerHTML = bits.join("");
}

function cardHTML(card) {
  const tags = (card.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");
  const preview = (card.notes || "").trim();
  return `
    <button type="button" class="card" draggable="true" data-id="${card.id}">
      <h3>${escapeHtml(card.title)}</h3>
      ${preview ? `<p>${escapeHtml(preview)}</p>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
    </button>
  `;
}

function renderBoard() {
  boardEl.innerHTML = COLUMNS.map((col) => {
    const list = cardsIn(col.id);
    return `
      <section class="column" data-status="${col.id}">
        <div class="column-head">
          <h2>${col.name}</h2>
          <span class="count">${list.length}</span>
        </div>
        <div class="column-body" data-drop="${col.id}">
          ${list.length === 0 ? `<div class="column-empty">Kart yok</div>` : ""}
          ${list.map(cardHTML).join("")}
        </div>
      </section>
    `;
  }).join("");

  boardEl.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => openModal(el.dataset.id));
    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("dragend", onDragEnd);
  });

  boardEl.querySelectorAll("[data-drop]").forEach((zone) => {
    zone.addEventListener("dragover", onDragOver);
    zone.addEventListener("dragleave", onDragLeave);
    zone.addEventListener("drop", onDrop);
  });
}

function render() {
  renderStats();
  renderBoard();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fillStatusOptions(selected) {
  fieldStatus.innerHTML = COLUMNS.map(
    (c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.name}</option>`,
  ).join("");
}

function openModal(id) {
  editingId = id || null;
  const card = id ? state.cards.find((c) => c.id === id) : null;
  modalTitle.textContent = card ? "Kartı düzenle" : "Yeni fikir";
  fieldTitle.value = card ? card.title : "";
  fieldNotes.value = card ? card.notes || "" : "";
  fieldTags.value = card ? (card.tags || []).join(", ") : "";
  fillStatusOptions(card ? card.status : "idea");
  btnDelete.hidden = !card;
  modalEl.hidden = false;
  fieldTitle.focus();
}

function closeModal() {
  modalEl.hidden = true;
  editingId = null;
  formEl.reset();
}

function nextOrder(status) {
  const list = cardsIn(status);
  return list.length ? Math.max(...list.map((c) => c.order)) + 1 : 0;
}

function saveCard(e) {
  e.preventDefault();
  const title = fieldTitle.value.trim();
  if (!title) return;
  const status = fieldStatus.value;
  const tags = parseTags(fieldTags.value);
  const notes = fieldNotes.value;
  const t = now();

  if (editingId) {
    state.cards = state.cards.map((c) => {
      if (c.id !== editingId) return c;
      const moved = c.status !== status;
      return {
        ...c,
        title,
        notes,
        tags,
        status,
        order: moved ? nextOrder(status) : c.order,
        updatedAt: t,
      };
    });
  } else {
    state.cards.push({
      id: uid(),
      title,
      notes,
      tags,
      status,
      order: nextOrder(status),
      createdAt: t,
      updatedAt: t,
    });
  }
  saveState(state);
  closeModal();
  render();
}

function deleteCard() {
  if (!editingId) return;
  if (!confirm("Bu kart silinsin mi?")) return;
  state.cards = state.cards.filter((c) => c.id !== editingId);
  saveState(state);
  closeModal();
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

  const siblings = cardsIn(status).filter((c) => c.id !== id);
  let insertAt = siblings.length;
  if (afterEl) {
    const afterId = afterEl.dataset.id;
    const idx = siblings.findIndex((c) => c.id === afterId);
    if (idx >= 0) insertAt = idx;
  }

  const reordered = [...siblings];
  reordered.splice(insertAt, 0, { ...card, status, updatedAt: now() });
  reordered.forEach((c, i) => {
    c.order = i;
  });

  const others = state.cards.filter((c) => c.status !== status && c.id !== id);
  state.cards = [...others, ...reordered];
  saveState(state);
  render();
}

function exportJSON() {
  const blob = new Blob([JSON.stringify({ version: 1, cards: state.cards }, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `kare-youtube-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!data || !Array.isArray(data.cards)) throw new Error("Geçersiz dosya");
      const cards = data.cards
        .filter((c) => c && typeof c.title === "string" && c.title.trim())
        .map((c, i) => ({
          id: typeof c.id === "string" ? c.id : uid(),
          title: String(c.title).trim().slice(0, 160),
          notes: String(c.notes || ""),
          tags: Array.isArray(c.tags) ? c.tags.map(String).slice(0, 12) : parseTags(c.tags),
          status: COLUMNS.some((col) => col.id === c.status) ? c.status : "idea",
          order: Number.isFinite(c.order) ? c.order : i,
          createdAt: c.createdAt || now(),
          updatedAt: now(),
        }));
      if (!confirm(`${cards.length} kart içe aktarılsın mı? Mevcut pano değişir.`)) return;
      state = { version: 1, cards };
      saveState(state);
      render();
    } catch {
      alert("JSON okunamadı.");
    }
  };
  reader.readAsText(file);
}

document.getElementById("btnNew").addEventListener("click", () => openModal(null));
document.getElementById("btnClose").addEventListener("click", closeModal);
document.getElementById("btnCancel").addEventListener("click", closeModal);
document.getElementById("btnDelete").addEventListener("click", deleteCard);
document.getElementById("btnExport").addEventListener("click", exportJSON);
document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) importJSON(file);
  e.target.value = "";
});
formEl.addEventListener("submit", saveCard);

modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.hidden) closeModal();
});

fillStatusOptions("idea");
render();
