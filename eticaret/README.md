# E-Ticaret Girişim Paneli

Araba aksesuarları girişiminin aşama, görev, ürün, finans, rakip, tedarikçi, günlük ve karar kaydı.

Veri tarayıcıda `localStorage` anahtarı `eticaret-os-v1` içinde durur. Backend yok.

Canlı yol: `https://dogusipeksac.com/eticaret/dist/`  
Üretim derlemesi `base: /eticaret/dist/` kullanır. Asset yolları bu öneke göredir.

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

Canlı sayfa `eticaret/dist/` klasöründen yayınlanır.

## Sonraki adım

Ürün araştırması aşamasına geçmeden önce bütçe ve süre kaydı. Sonra ürün tablosu.
