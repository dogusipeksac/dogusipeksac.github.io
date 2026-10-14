const CART_KEY = "kort-sepet";

/** Ürün karesinde yazıyla aynı bölge kalsın diye kadraj. */
const FOCUS = {
  "mac-tisort": "center 42%",
  "mac-sort": "center 72%",
  "bilek-bandi": "center 36%",
  "overgrip": "center 48%",
  damper: "18% 28%",
  "antrenman-filesi": "center 48%",
  "direnc-bandi": "center 40%",
  "ic-saha-forma": "center 30%",
  "fg-krampon": "78% 55%",
  "hali-krampon": "center 48%",
  tekmelik: "center 78%",
  "basket-forma": "center 34%",
  "basket-sort": "center 68%",
  "indoor-ayakkabi": "center 90%",
  "kosu-sort": "center 58%",
  "kosu-corap": "center 90%",
  "bel-cantasi": "center 28%",
};

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

function sportById(id) {
  return SPORTS.find((s) => s.id === id) || null;
}

function header(query, sport) {
  const meta = sportById(sport);
  return `
    <header class="top">
      <a class="brand" href="#/"><strong>${SHOP.name}</strong><span>${meta ? meta.name : SHOP.line}</span></a>
      <input class="search" id="q" placeholder="${meta ? meta.search : "Spor veya ürün ara"}" value="${escapeHtml(query)}" />
      <nav class="nav">
        <a href="#/">Sporlar</a>
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
        <div class="swatch">${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}"${FOCUS[p.id] ? ` style="object-position:${FOCUS[p.id]}"` : ""}>` : escapeHtml(p.mark)}</div>
        <div class="meta">
          <h2>${p.name}</h2>
          <p>${p.blurb}</p>
          <div class="price"><b>${money(p.price)}</b>${p.compare ? `<s>${money(p.compare)}</s>` : ""}</div>
        </div>
      </a>`,
    )
    .join("")}</div>`;
}

function sportChips(active) {
  return SPORTS.map(
    (s) => `<button class="sport ${s.id === active ? "on" : ""}" data-sport="${s.id}">${s.name}</button>`,
  ).join("");
}

function worlds() {
  return `<div class="worlds">${SPORTS.map(
    (s) => `
      <button class="world w-${s.id}" data-sport="${s.id}" style="${s.image ? `background-image:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.55)),url('${s.image}')` : ""}">
        <span>${s.kicker}</span>
        <strong>${s.name}</strong>
        <em>${s.panel}</em>
      </button>`,
  ).join("")}</div>`;
}

function home(query, cat, sport) {
  const sportMeta = sportById(sport);
  const q = query.trim().toLocaleLowerCase("tr");
  const matches = (p) => !q || p.name.toLocaleLowerCase("tr").includes(q) || p.blurb.toLocaleLowerCase("tr").includes(q) || (sportById(p.sport)?.name || "").toLocaleLowerCase("tr").includes(q);

  if (!sportMeta) {
    let list = PRODUCTS.filter(matches);
    if (q) {
      return `
        <section class="hero">
          <div>
            <div class="kicker">${SHOP.line}</div>
            <h1>Arama.</h1>
            <p class="lede">“${escapeHtml(query)}” için bütün sahalar.</p>
          </div>
          <div class="hero-panel is-genel"><p>Beş spor. Tek sepet.</p></div>
        </section>
        ${grid(list)}
      `;
    }
    return `
      <section class="hero">
        <div>
          <div class="kicker">${SHOP.line}</div>
          <h1>Hangi sahadasın?</h1>
          <p class="lede">Tenis, futbol, koşu, basketbol, fitness. Bir spor seçince renk, zemin ve vitrin o sahaya döner. Sepet ve ödeme bu demoda simülasyondur.</p>
        </div>
        <div class="hero-panel is-genel"><p>Beş spor. Tek sepet.</p></div>
      </section>
      ${worlds()}
    `;
  }

  let list = PRODUCTS.filter((p) => p.sport === sportMeta.id).filter(matches);
  if (cat) list = list.filter((p) => p.category === cat);
  const chips = [{ id: "", name: "Tümü" }, ...sportMeta.categories]
    .map((c) => `<button class="chip ${c.id === cat ? "on" : ""}" data-cat="${c.id}">${c.name}</button>`)
    .join("");
  return `
    <section class="hero">
      <div>
        <div class="kicker">${sportMeta.kicker}</div>
        <h1>${sportMeta.title}</h1>
        <p class="lede">${sportMeta.lede}</p>
      </div>
      <div class="hero-panel is-${sportMeta.id}"><p>${sportMeta.panel}</p></div>
    </section>
    <div class="sports">${sportChips(sportMeta.id)}</div>
    <div class="cats">${chips}</div>
    ${grid(list)}
  `;
}

function detail(id) {
  const p = productById(id);
  if (!p) return `<p class="empty">Ürün yok.</p>`;
  const sportMeta = sportById(p.sport);
  const cat = sportMeta?.categories.find((c) => c.id === p.category);
  return `
    <a class="back" href="#/?spor=${p.sport}">← ${sportMeta ? sportMeta.name : "Vitrin"}</a>
    <article class="product">
      <div class="swatch">${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}"${FOCUS[p.id] ? ` style="object-position:${FOCUS[p.id]}"` : ""}>` : escapeHtml(p.mark)}</div>
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
  if (!rows.length) return `<h1>Sepet boş</h1><p class="empty"><a href="#/">Sporlara dön</a></p>`;
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
  if (!rows.length) return `<p class="empty">Sepet boş. <a href="#/">Sporlar</a></p>`;
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
  return `<h1>Sipariş alındı</h1><p class="lede">Demoda kargo çıkmaz. Sepet temizlendi.</p><p><a href="#/">Sporlara dön</a></p>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function themeFor(route, sport, productId) {
  if (route === "urun") return productById(productId)?.sport || "genel";
  if (route === "sepet" || route === "odeme" || route === "tesekkur") return "genel";
  return sport || "genel";
}

function render() {
  const { a, b, params } = parse();
  const query = params.get("q") || "";
  const cat = a === "kategori" ? b : params.get("kat") || "";
  const sport = params.get("spor") || "";
  document.documentElement.dataset.sport = themeFor(a, sport, b);
  const root = document.getElementById("app");
  let body = home(query, cat, sport);
  if (a === "urun") body = detail(b);
  if (a === "sepet") body = cartView();
  if (a === "odeme") body = checkout();
  if (a === "tesekkur") body = thanks();
  const headerSport = a === "urun" ? productById(b)?.sport || "" : sport;
  root.innerHTML = header(query, headerSport) + `<main class="wrap">${body}</main>`;
  bind(query, cat, headerSport || sport);
}

function shopHash(query, cat, sport) {
  const next = new URLSearchParams();
  if (query) next.set("q", query);
  if (sport) next.set("spor", sport);
  if (cat) next.set("kat", cat);
  const s = next.toString();
  return s ? `#/?${s}` : "#/";
}

function bind(query, cat, sport) {
  const q = document.getElementById("q");
  if (q) {
    q.addEventListener("change", () => {
      location.hash = shopHash(q.value, "", sport);
    });
  }
  document.getElementById("open-cart")?.addEventListener("click", () => {
    location.hash = "#/sepet";
  });
  document.querySelectorAll("button[data-sport]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-sport");
      location.hash = shopHash(query, "", id);
    });
  });
  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cat");
      location.hash = shopHash(query, id, sport);
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
