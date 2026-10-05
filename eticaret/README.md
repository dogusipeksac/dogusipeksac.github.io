# E-Ticaret Girişim Paneli

Araba aksesuarları girişiminin aşama, görev, ürün, finans, rakip, tedarikçi, günlük ve karar kaydı.

Veri tarayıcıda `localStorage` anahtarı `eticaret-os-v1` içinde durur. Backend yok.

Canlı yol: `https://dogusipeksac.com/eticaret/`  
Üretim derlemesi `base: /eticaret/` kullanır. Asset yolları bu öneke göredir.

## Çalıştırma

```bash
cd eticaret
npm install
npm run dev
```

Üretim:

```bash
npm run build
npm run preview
```

`dist/` içeriği `/eticaret/` altına konduğunda sayfa açılır.

## Sonraki adım

Ürün araştırması aşamasına geçmeden önce bütçe ve süre kaydı. Sonra ürün tablosu.
