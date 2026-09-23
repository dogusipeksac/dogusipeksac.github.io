# Yakınımdaki İşletmeleri Bul

OpenStreetMap + Overpass + Leaflet ile yakındaki işletmeleri listeler. Web sitesi olmayanları potansiyel müşteri olarak öne çıkarır.

**AI API yok. Google Maps yok. API key yok.**

## Teknoloji

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Leaflet / React Leaflet
- OpenStreetMap tiles
- Overpass API (ücretsiz)

## Kurulum

```bash
cd isletme-bulucu
npm install
```

## Geliştirme

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` açılır. Konum izni isteyecek; reddederseniz haritaya tıklayarak konum seçin.

## Production build

```bash
npm run build
npm run preview
```

GitHub Pages için build çıktısı `dist/` klasöründedir. Canlı URL:

`https://dogusipeksac.com/isletme-bulucu/dist/`

`dist/` klasörünü commit edip Pages’e deploy edin.

## Özellikler

1. Tarayıcı geolocation (veya haritadan manuel konum)
2. Leaflet harita + OSM katmanı
3. Overpass ile yakındaki işletmeler (1 / 3 / 5 / 10 km)
4. Website var/yok etiketi
5. Potansiyel müşteri puanı (kural tabanlı, AI yok)
6. Filtreler: kategori, mesafe, website, sıralama
7. İşletme kartları + detay paneli
8. WhatsApp linki (telefon varsa)
9. CSV export
10. Responsive SaaS layout (desktop: filtre | harita | liste)

## Proje yapısı

```
src/
  components/   # Map, Card, Filters, Stats, Detail
  pages/        # HomePage
  services/     # Overpass + normalize
  hooks/        # useGeolocation, useBusinesses
  types/
  utils/        # geo, scoring, filters
  constants/    # kategoriler, OSM endpoints
```

## Notlar

- Overpass bazen yoğunlukta yavaş veya rate-limit olabilir; uygulama yedek endpoint dener.
- OSM’de olmayan telefon/website uydurulmaz.
- Veri kalitesi bölgeye göre değişir.
