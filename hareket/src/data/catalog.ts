import type { Equipment, Group, Level, Pattern } from '../types'

export const groups: Record<Group, { name: string; description: string; cue: string }> = {
  gogus: { name: 'Göğüs', description: 'Göğüs kasları, üst kolu gövdenin önüne getirmeye ve itiş hareketlerine katkı sağlar. Eğim ve tutuş, yükün dağılımını değiştirebilir.', cue: 'İtişin temeli' },
  sirt: { name: 'Sırt', description: 'Geniş sırt, trapez ve kürek kemikleri çevresindeki kaslar; çekiş, omuz kuşağının kontrolü ve gövde desteğinde birlikte çalışır.', cue: 'Güçlü bir duruş' },
  omuz: { name: 'Omuz', description: 'Deltoidin ön, orta ve arka bölümleri farklı hareketlerde öne çıkar. Baş üstü itişler ön omuzu, yana açışlar orta omuzu, ters açışlar arka omuzu vurgular; hepsi aynı şey değildir.', cue: 'Her yönde güç' },
  biceps: { name: 'Ön kol kası (biceps)', description: 'Üst kolun önündeki biceps, dirseği bükmeye ve avuç içini yukarı çevirmeye katkı verir. Buradaki ön kol ifadesi üst kolun ön yüzünü anlatır.', cue: 'Çekişe destek' },
  triceps: { name: 'Arka kol (triceps)', description: 'Üst kolun arkasındaki triceps, dirseğin açılmasını sağlar. İtişlerde ve dirsek açma hareketlerinde çalışır.', cue: 'İtişi tamamla' },
  'on-kol': { name: 'Ön kol ve kavrama', description: 'Dirsek ile el bileği arasındaki kaslar; kavramayı, el bileğinin kontrolünü ve dirsek bükmeye desteği sağlar.', cue: 'Gücünü kavra' },
  core: { name: 'Karın ve merkez bölge', description: 'Karın çevresi ve derin gövde kasları, gövdenin hareketine ve hareket karşısında dengede kalmasına katkı sağlar. Merkez çalışması yalnızca mekikten oluşmaz.', cue: 'Merkezini güçlendir' },
  kalca: { name: 'Kalça', description: 'Kalça kasları; kalçayı açma, bacağı yana götürme ve leğen kemiğini dengede tutmada rol alır.', cue: 'Hareketin itici gücü' },
  'on-bacak': { name: 'Ön bacak', description: 'Quadriceps, uyluğun önündeki kas grubudur. Diz açmada, çömelmede ve basamak çıkmada görev alır.', cue: 'Sağlam bir temel' },
  'arka-bacak': { name: 'Arka bacak', description: 'Hamstring kasları, uyluğun arkasında bulunur; dizi bükmeye ve kalçayı açmaya katkı verir. Kalça menteşesi ve diz bükme çalışmaları farklı yüklemeler sunar.', cue: 'Kontrollü kuvvet' },
  baldir: { name: 'Baldır', description: 'Baldır kasları ayak bileğinden yükselmeyi sağlar. Diz bükülü ve düz çalışmalar, kaslar arasındaki yük dağılımını değiştirir.', cue: 'Yerden güç al' },
}
export const equipment: Record<Equipment, { name: string; description: string; safety: string; main?: boolean }> = {
  'vucut-agirligi': { name: 'Vücut ağırlığı', description: 'Vücudunu direnç olarak kullan. Bazı varyasyonlar ayrıca sabit destek, duvar veya bar gerektirir.', safety: 'Kaymayan, boş bir alan seç. Destek gereken hareketlerde sağlamlığı önceden kontrol et.', main: true },
  dumbbell: { name: 'Dambıl', description: 'Her elde ayrı yükle, çok farklı kas gruplarını çalıştırmaya uygun serbest ağırlık.', safety: 'Kontrol edebildiğin yükü seç. Ayarlanabilir dambılların kilitlerini kontrol et.', main: true },
  barbell: { name: 'Barbell / halter', description: 'İki elle kullanılan uzun bar. Çoğu uygulamada ağırlık plakaları, kilitler ve bazen güvenlik rafı gerekir.', safety: 'Plakaları sabitle; ağır pres ve squat için uygun güvenlik kolları ve gerektiğinde deneyimli destek kullan.', main: true },
  kettlebell: { name: 'Kettlebell', description: 'Saplı ağırlık; taşıma, çömelme ve kalça menteşesi hareketlerinde kullanılır.', safety: 'Savurma hareketlerini menteşe tekniğini öğrendikten sonra dene; çevrende geniş boşluk bırak.', main: true },
  'direnc-bandi': { name: 'Direnç bandı', description: 'Uzadıkça direnci değişen taşınabilir ekipman. Bazı hareketler ayrıca güvenli bir bağlantı noktası gerektirir.', safety: 'Yırtık ve aşınma kontrolü yap. Bant ve sabitleyicinin yük sınırlarını aşma.', main: true },
  kablo: { name: 'Kablo makinesi', description: 'Ayarlanabilen makara yüksekliği ve tutamaklarıyla farklı yönlerden direnç sunar.', safety: 'Pimi tam yerleştir; hareketin gerektirdiği tutamak, ip veya bilek aparatını kullan.', main: true },
  makine: { name: 'Spor salonu makineleri', description: 'Belirli bir hareket yolu sunar. Koltuk, ped ve başlangıç ayarlarının kişiye uyarlanması gerekir.', safety: 'Makinenin üzerindeki üretici talimatlarını oku. Eklem hattını cihazın dönme eksenine uygun ayarla.', main: true },
  'barfiks-bari': { name: 'Barfiks barı', description: 'Asılma ve dikey çekiş hareketleri için yük taşıyan sabit bar.', safety: 'Montajını ve taşıma kapasitesini kontrol et. Zıplayarak veya savrularak başlamaktan kaçın.', main: true },
  sehpa: { name: 'Bench / sehpa', description: 'Yatarak ya da oturarak çalışmaya uygun, yük taşımak için üretilmiş antrenman sehpası.', safety: 'Sehpanın kaymadığını ve açı kilitlerinin yerinde olduğunu kontrol et. Ev mobilyası aynı güvenliği sağlamayabilir.', main: true },
  rack: { name: 'Güvenlik rafı ve kolları', description: 'Barı uygun yükseklikte alma ve kontrollü biçimde bırakma için raf sistemi.', safety: 'Güvenlik kollarını hareketine göre ayarla; barı almadan önce boş barla dene.' },
  duvar: { name: 'Sağlam duvar', description: 'Duvar destekli hareketler için düz, sağlam yüzey.', safety: 'El ve ayak temasının kaymadığından ve çevrenin boş olduğundan emin ol.' },
  'sabit-destek': { name: 'Sabit yükselti / destek', description: 'Yük taşıma kapasitesi uygun, devrilmeyen ve kaymayan destek.', safety: 'Hafif sandalye, oynayan masa ve tekerlekli mobilya kullanma.' },
  'band-sabitleyici': { name: 'Bant sabitleyici', description: 'Direnç bandını güvenli biçimde bağlamaya uygun bağlantı noktası veya aparat.', safety: 'Bağlantıyı düşük gerilimle test et; kapı aparatı varsa üreticinin yön ve yük talimatına uy.' },
}
export const levels: Record<Level, string> = { baslangic: 'Başlangıç', orta: 'Orta', ileri: 'İleri' }
export const patterns: Record<Pattern, string> = { itis: 'İtiş', cekis: 'Çekiş', squat: 'Çömelme', 'kalca-mentesesi': 'Kalça menteşesi', core: 'Merkez bölge', izolasyon: 'İzolasyon', tasima: 'Taşıma' }
export const environments = { ev: 'Ev', salon: 'Spor salonu' }
export const sourceStatus = 'Genel kaynaklardan yararlanılarak hazırlanmış editoryal özet; kişiye özel form değerlendirmesi değildir.'
