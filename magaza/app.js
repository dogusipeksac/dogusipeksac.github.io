const CART_KEY = "kort-sepet";

const money = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

const cart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};
const saveCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items));
const count = () => cart().reduce((s, i) => s + i.qty, 0);

function add(id, qty) {
  const items = cart();
  const row = items.find((i) => i.id === id);
  if (row) row.qty += qty;
  else items.push({ id, qty });
  saveCart(items);
  render();
}

function setQty(id, qty) {
  const items = cart().map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0);
  saveCart(items);
  render();
}

function productById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function parse() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, search] = raw.split("?");
  const [a, b] = (path || "").split("/");
  return { a: a || "", b: b || "", params: new URLSearchParams(search || "") };
}

function header(query) {
  return `
    <header class="top">
      <a class="brand" href="#/"><strong>${SHOP.name}</strong><span>${SHOP.line}</span></a>
      <input class="search" id="q" placeholder="Raket, top, ayakkabı ara" value="${escapeHtml(query)}" />
      <nav class="nav">
        <a href="#/">Kort</a>
        <button class="cart-btn" id="open-cart">Sepet ${count()}</button>
      </nav>
    </header>`;
}

function grid(list) {
  if (!list.length) return `<p class="empty">Bu aramada ürün yok.</p>`;
  return `<div class="grid">${list
    .map(
      (p) => `
      <a class="card" href="#/urun/${p.id}">
        <div class="swatch${p.ink ? " ink" : ""}" style="background:${p.tone};${p.ink ? `color:${p.ink}` : ""}">${p.mark}</div>
        <div class="meta">
          <h2>${p.name}</h2>
          <p>${p.blurb}</p>
          <div class="price"><b>${money(p.price)}</b>${p.compare ? `<s>${money(p.compare)}</s>` : ""}</div>
        </div>
      </a>`,
    )
    .join("")}</div>`;
}

function home(query, cat, sport) {
  const activeSport = sport || "tenis";
  const sportMeta = SPORTS.find((s) => s.id === activeSport) || SPORTS[0];
  const q = query.trim().toLocaleLowerCase("tr");
  let list = PRODUCTS.filter((p) => (p.sport || "tenis") === activeSport);
  list = list.filter((p) => !q || p.name.toLocaleLowerCase("tr").includes(q) || p.blurb.toLocaleLowerCase("tr").includes(q));
  if (cat) list = list.filter((p) => p.category === cat);
  const sportChips = SPORTS.map(
    (s) =>
      `<button class="sport ${s.id === activeSport ? "on" : ""} ${s.soon ? "soon" : ""}" data-sport="${s.id}">${s.name}${s.soon ? " · yakında" : ""}</button>`,
  ).join("");
  const chips = [{ id: "", name: "Tümü" }, ...CATEGORIES]
    .map(
      (c) =>
        `<button class="chip ${c.id === cat ? "on" : ""}" data-cat="${c.id}">${c.name}</button>`,
    )
    .join("");
  const body = sportMeta.soon
    ? `<section class="soon"><h2>${sportMeta.name} sırada</h2><p>Kort şimdilik tenisle açık. ${sportMeta.name} vitrini eklenince burada duracak. Bu arada raket ve topa bak.</p></section>`
    : `<div class="cats">${chips}</div>${grid(list)}`;
  return `
    <section class="hero">
      <div>
        <div class="kicker">${SHOP.line}</div>
        <h1>Önce kort.</h1>
        <p class="lede">Raket, ayakkabı, top ve maç ekipmanı. Spor mağazası tenisle başlıyor; diğer sahalar sırada. Sepet ve ödeme bu demoda simülasyondur.</p>
      </div>
      <div class="hero-panel"><p>Servis. Ralli. Maç.</p></div>
    </section>
    <div class="sports">${sportChips}</div>
    ${body}
  `;
}

function detail(id) {
  const p = productById(id);
  if (!p) return `<p class="empty">Ürün yok.</p>`;
  const cat = CATEGORIES.find((c) => c.id === p.category);
  return `
    <a class="back" href="#/">← Korta dön</a>
    <article class="product">
      <div class="swatch${p.ink ? " ink" : ""}" style="background:${p.tone};${p.ink ? `color:${p.ink}` : ""}">${p.mark}</div>
      <div>
        <div class="kicker">${cat ? cat.name : ""}</div>
        <h1>${p.name}</h1>
        <p class="lede">${p.blurb}</p>
        <div class="price"><b>${money(p.price)}</b>${p.compare ? `<s>${money(p.compare)}</s>` : ""}</div>
        <ul class="clean">${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
        <div class="buy">
          <input id="qty" type="number" min="1" value="1" />
          <button id="add">Sepete ekle</button>
        </div>
      </div>
    </article>`;
}

function cartView() {
  const rows = cart()
    .map((i) => ({ ...i, product: productById(i.id) }))
    .filter((i) => i.product);
  if (!rows.length) return `<h1>Sepet boş</h1><p class="empty"><a href="#/">Korta dön</a></p>`;
  const total = rows.reduce((s, i) => s + i.product.price * i.qty, 0);
  return `
    <h1>Sepet</h1>
    ${rows
      .map(
        (i) => `
      <div class="cart-row">
        <div>
          <strong>${i.product.name}</strong>
          <div class="note">${money(i.product.price)}</div>
          <div class="qty">
            <button data-dec="${i.id}">−</button>
            <span>${i.qty}</span>
            <button data-inc="${i.id}">+</button>
          </div>
        </div>
        <div>${money(i.product.price * i.qty)}</div>
      </div>`,
      )
      .join("")}
    <div class="sum"><span>Toplam</span><strong>${money(total)}</strong></div>
    <p class="note">Demo: karttan çekim yok, kargo hesaplanmaz.</p>
    <p><a class="primary" href="#/odeme">Siparişi dene</a></p>
  `;
}

function checkout() {
  const rows = cart().filter((i) => productById(i.id));
  if (!rows.length) return `<p class="empty">Sepet boş. <a href="#/">Kort</a></p>`;
  return `
    <h1>Teslimat</h1>
    <p class="note">Bu bir demo. Bilgiler kaydedilmez, ödeme alınmaz.</p>
    <form class="form" id="order">
      <input name="ad" required placeholder="Ad" />
      <input name="tel" required placeholder="Telefon" />
      <textarea name="adres" required rows="3" placeholder="Adres"></textarea>
      <button class="primary" type="submit">Siparişi tamamla</button>
    </form>`;
}

function thanks() {
  return `<h1>Sipariş alındı</h1><p class="lede">Demoda kargo çıkmaz. Sepet temizlendi.</p><p><a href="#/">Korta dön</a></p>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function render() {
  const { a, b, params } = parse();
  const query = params.get("q") || "";
  const cat = a === "kategori" ? b : params.get("kat") || "";
  const sport = params.get("spor") || "";
  const root = document.getElementById("app");
  let body = home(query, cat, sport);
  if (a === "urun") body = detail(b);
  if (a === "sepet") body = cartView();
  if (a === "odeme") body = checkout();
  if (a === "tesekkur") body = thanks();
  root.innerHTML = header(query) + `<main class="wrap">${body}</main>`;
  bind(query, cat, sport);
}

function shopHash(query, cat, sport) {
  const next = new URLSearchParams();
  if (query) next.set("q", query);
  if (sport && sport !== "tenis") next.set("spor", sport);
  if (cat) next.set("kat", cat);
  const s = next.toString();
  return s ? `#/?${s}` : "#/";
}

function bind(query, cat, sport) {
  const q = document.getElementById("q");
  if (q) {
    q.addEventListener("change", () => {
      location.hash = `#/?q=${encodeURIComponent(q.value)}`;
    });
  }
  document.getElementById("open-cart")?.addEventListener("click", () => {
    location.hash = "#/sepet";
  });
  document.querySelectorAll("[data-sport]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-sport");
      location.hash = shopHash(query, "", id);
    });
  });
  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cat");
      location.hash = shopHash(query, id, sport || "tenis");
    });
  });
  document.getElementById("add")?.addEventListener("click", () => {
    const { b } = parse();
    const qty = Math.max(1, Number(document.getElementById("qty").value) || 1);
    add(b, qty);
    location.hash = "#/sepet";
  });
  document.querySelectorAll("[data-inc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-inc");
      const row = cart().find((i) => i.id === id);
      if (row) setQty(id, row.qty + 1);
    });
  });
  document.querySelectorAll("[data-dec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-dec");
      const row = cart().find((i) => i.id === id);
      if (row) setQty(id, row.qty - 1);
    });
  });
  document.getElementById("order")?.addEventListener("submit", (e) => {
    e.preventDefault();
    saveCart([]);
    location.hash = "#/tesekkur";
  });
  void cat;
  void sport;
}

window.addEventListener("hashchange", render);
render();
