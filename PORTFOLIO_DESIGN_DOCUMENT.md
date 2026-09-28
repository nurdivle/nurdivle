# Kişisel Portfolyo — Ürün ve Tasarım Dokümanı

**Sürüm:** 1.1
**Durum:** Uygulama ve yayın hazırlığı
**Tarih:** 24 Eylül 2026
**Site dilleri:** Türkçe (`tr`) ve İngilizce (`en`)

## 1. Amaç

Bu proje, yazılım geliştirici profilini sade, hızlı ve içerik odaklı bir portfolyo olarak sunacaktır. [Brittany Chiang portfolyosu](https://brittanychiang.com/) yalnızca sayfa iskeleti ve etkileşim modeli açısından referanstır; görsel tasarım, metinler ve bileşenler birebir kopyalanmayacaktır.

Ana deneyim:

- Masaüstünde sol sütun kimlik, kısa tanıtım, bölüm navigasyonu ve sosyal bağlantıları taşır; ekran içinde sabit kalır.
- Sağ sütun sayfanın asıl içeriğidir ve normal belge akışında aşağı kayar.
- Sol navigasyondaki bir bölüm seçildiğinde sağ içerik ilgili başlığa yumuşak biçimde kayar.
- Mobilde yapı tek kolona döner; sol sütun sabit kalmaz ve bölüm navigasyonu kompakt bir menüye dönüşür.
- İçerik Türkçe ve İngilizce olarak sunulur; dil değiştiğinde bölüm bağlantısı da hedef dildeki karşılığına dönüşür.
- Bölüm adları, anchor değerleri, sıraları, görünürlükleri ve bölüm içerikleri yönetim panelinden kod değişikliği olmadan güncellenebilir.

> Ekli beceri görselindeki kişi, şirket, konum ve teknoloji isimleri gerçek portfolyo içeriği olarak kabul edilmemiştir; yalnızca kart yapısı görsel referanstır.

## 2. Kapsam

### MVP kapsamında

1. About
2. Experience
3. Projects
4. Skills
5. Education
6. Hobbies
7. Sabit masaüstü sol sütun ve bölüm bazlı aktif navigasyon
8. Türkçe ve İngilizce içerik
9. Yönetim paneli, taslak/yayın akışı ve içerik sıralama
10. Mobil, tablet ve masaüstü uyumluluğu
11. Erişilebilirlik, SEO, performans ve temel analitik hazırlığı

### MVP sonrasına bırakılanlar

- Arka planda düşük yoğunluklu `0` ve `1` animasyonu
- Açık/koyu tema seçimi
- Blog veya yazılar bölümü
- Ayrı proje arşivi
- İletişim formu
- Birden fazla editör rolü ve gelişmiş yayın onayı

## 3. Temel ürün kararları

| Konu | Karar | Gerekçe |
|---|---|---|
| Sayfa tipi | Tek sayfalı portfolyo, dil bazlı URL ve localized anchor | Hızlı tarama, paylaşılabilir bölüm bağlantıları ve doğru dil bağlamı sağlar |
| Masaüstü yerleşim | Yaklaşık `%40 / %60` iki kolon | Sol bilgiyi sakin tutar, içerik tarafına daha fazla alan verir |
| Sol kolon | `position: sticky`, `100svh` | Sayfa boyunca kimlik ve navigasyon görünür kalır |
| Mobil yerleşim | Tek kolon | Küçük ekranda sabit sol kolon kullanılabilir değildir |
| Tasarım yönü | Panelden seçilebilir 17 koyu palet; varsayılan Duman Grafit | Sade ve okunabilir yapıyı korurken görsel tonun kod değiştirmeden seçilmesini sağlar |
| Ayırma yöntemi | Boşluk, ton farkı ve çok yumuşak gölge | Dekoratif çizgi veya çerçeve kullanılmaz |
| İçerik yönetimi | Payload CMS | Aynı Next.js uygulamasında tip güvenli yönetim paneli ve yerelleştirme sağlar |
| Dil yapısı | `/tr` ve `/en` | Paylaşılabilir, indekslenebilir ve net URL yapısı sağlar |
| Animasyon | CSS öncelikli, kısa ve düşük mesafeli | Daha az JavaScript ve daha sakin deneyim |
| Arka plan | MVP'de statik, çok hafif radyal ışık | Metin okunurluğunu riske atmaz |

## 4. Bilgi mimarisi

Her bölümün sistem içinde değişmeyen bir `key` değeri, ziyaretçiye gösterilen localized etiketi ve her dil için panelden yönetilen ayrı bir anchor değeri bulunur. URL'de görünen anchor seçilen dile göre değişir:

| Sistem anahtarı | İngilizce etiket | İngilizce anchor | Türkçe etiket | Türkçe anchor |
|---|---|---|---|---|
| `about` | About | `#about` | Hakkımda | `#hakkimda` |
| `experience` | Experience | `#experience` | Deneyim | `#deneyim` |
| `projects` | Projects | `#projects` | Projeler | `#projeler` |
| `skills` | Skills | `#skills` | Beceriler | `#beceriler` |
| `education` | Education | `#education` | Eğitim | `#egitim` |
| `hobbies` | Hobbies | `#hobbies` | Hobiler | `#hobiler` |

Yukarıdaki değerler seed/başlangıç değerleridir; etiketler, anchor'lar, sıralama ve görünürlük panelden değiştirilebilir.

Örnek adresler:

- `/en#projects`
- `/tr#projeler`

Dil değiştirme sırasında ham hash kopyalanmaz. Uygulama mevcut anchor'ı bölümün değişmeyen `key` değerine çözer, ardından hedef dildeki anchor'ı üretir. Örneğin `/tr#projeler` adresinden İngilizceye geçildiğinde hedef `/en#projects` olur; `/en#skills` adresinden Türkçeye geçildiğinde hedef `/tr#beceriler` olur.

Anchor kuralları:

- Küçük harf, ASCII karakter, rakam ve tire kullanılabilir.
- Türkçe karakterler URL uyumluluğu için dönüştürülür: `ç→c`, `ğ→g`, `ı→i`, `ö→o`, `ş→s`, `ü→u`.
- Aynı dil içinde anchor değerleri benzersiz olmalıdır.
- Anchor değiştirildiğinde eski paylaşılan bağlantılar için opsiyonel `legacyAnchors[]` alanı yönlendirme/eşleştirme amacıyla saklanır.

## 5. Yerleşim sistemi

### 5.1 Masaüstü — `1024px` ve üzeri

```text
┌──────────────────────────────────────────────────────────────┐
│  Sol sütun — sticky 40%     │  Sağ içerik — scroll 60%      │
│                             │                                │
│  İsim                       │  ABOUT                         │
│  Ünvan + kısa cümle         │  Metin                         │
│                             │                                │
│  Bölüm navigasyonu          │  EXPERIENCE                    │
│                             │  Zaman çizgisi / kayıtlar       │
│  About                      │                                │
│  Experience                 │  PROJECTS                      │
│  Projects                   │  Proje kayıtları                │
│  Skills                     │                                │
│  Education                  │  SKILLS                        │
│  Hobbies                    │  3 kolon kart ızgarası          │
│                             │                                │
│  Sosyal bağlantılar         │  EDUCATION / HOBBIES           │
└──────────────────────────────────────────────────────────────┘
```

- Genel içerik genişliği: `1180–1280px`, ortalanmış.
- Dış boşluk: geniş ekranda `48–64px`, standart masaüstünde `32–48px`.
- Sol sütun ekran yüksekliğini aşarsa içerik küçültülmez; kısa ekran kuralı uygulanır.
- `850px` altındaki masaüstü yüksekliğinde kimlik tipografisi ve navigasyon aralığı sıkılaşır; sosyal ikonlar normal akışa yaklaşır.
- Sağ bölüm başlangıçları arasında `112–144px` dikey boşluk bulunur.
- Bölümlerin dekoratif çerçevesi veya ayırıcı çizgisi yoktur.

### 5.2 Tablet — `768–1023px`

- Tek kolon kullanılır.
- Kimlik alanı üstte yer alır.
- Üst alanda isim, dil seçici ve kompakt bölüm menüsü bulunur.
- Skills ızgarası iki kolondur.
- Bölüm başlıkları içerik içinde görünürdür.

### 5.3 Mobil — `767px` ve altı

- Tek kolon ve `24px` yatay boşluk.
- Skills ızgarası tek kolondur.
- Dil seçici sağ üstte kalır; menü açıldığında hedefler yeterli dokunma alanına sahip olur.
- Kartlar ve uzun metinler yatay kaydırma üretmez.
- Bölüm başlıklarında `scroll-margin-top` kullanılır.
- Sabit alt sağ kontrol MVP için önerilmez; mobil tarayıcı kontrolleri ve gelecekteki iletişim butonuyla çakışabilir.

## 6. Sol sütun

İçerik sırası:

1. İsim
2. Meslek unvanı
3. Tek cümlelik değer önerisi
4. Bölüm navigasyonu
5. Sosyal bağlantılar ve özgeçmiş bağlantısı

Navigasyonun aktif durumu referans sitedeki yatay çizgiyle gösterilmez. Bunun yerine:

- aktif metin vurgu rengine geçer,
- yazı kalınlığı artar,
- metnin arkasında çok düşük opaklıklı yumuşak bir leke kullanılır,
- durum yalnızca renge bağlı kalmaması için küçük dolu bir nokta ve `aria-current="location"` ile desteklenir.

Aktif bölüm `IntersectionObserver` ile belirlenir. Navigasyon bağlantıları CMS'den gelen aktif dil etiketi ve anchor'ıyla oluşturulur. Tıklamada yerel `scroll-behavior: smooth` kullanılır; azaltılmış hareket tercihinde kaydırma anında gerçekleşir.

## 7. Sol kimlik alanı

Sol sütun yalnızca temel kimlik bilgileri, bölüm navigasyonu ve sosyal bağlantıları içerir. Ayrı JSON/kod kartı kullanılmaz; böylece alan daha sade kalır ve içerik hiyerarşisi isim, ünvan ve kısa tanıtım cümlesine odaklanır.

## 8. Bölüm tasarımları

### 8.1 About

- İki veya üç kısa paragraf.
- İlk paragrafta rol ve odak.
- İkinci paragrafta güncel çalışma alanı ve yaklaşım.
- İsteğe bağlı üçüncü paragrafta kişilik/hobi bağlantısı.
- Metin genişliği yaklaşık `60–68ch` ile sınırlanır.

### 8.2 Experience

- Tarih, rol/şirket, kısa açıklama ve teknoloji etiketlerinden oluşur.
- Kart çerçevesi kullanılmaz; hover/focus sırasında yalnızca yüzey tonu ve `translateY(-2px)` değişir.
- Tarih masaüstünde dar sol alt kolonda, tablet/mobilde başlığın üstünde görünür.
- Güncel pozisyon için metin rozeti kullanılabilir; rozet dolu yüzeydir, kontur değildir.

### 8.3 Projects

- Proje başlığı, özet, rol, teknoloji listesi, canlı bağlantı ve kaynak kodu bağlantısı.
- Görsel kullanımı isteğe bağlıdır. Görsel varsa sabit en-boy oranı ile yüklenir ve kayma oluşturmaz.
- Öne çıkan projeler üstte, diğerleri paneldeki sıra alanına göre listelenir.
- Hover etkisi tüm kaydı tıklanabilir hale getirmez; bağlantı hedefleri açık ve klavye ile erişilebilir kalır.

### 8.4 Skills

Ekli görseldeki grup mantığı korunur; çerçeveler kaldırılır ve koyu tema için yeniden yorumlanır.

Önerilen başlangıç grupları:

1. Backend Engineering
2. Distributed Systems
3. Cloud & DevOps
4. Data & Persistence
5. Security & Quality
6. Observability & Delivery

Kart yapısı:

- İkon
- Yerelleştirilebilir grup başlığı
- Teknoloji/konu etiketleri
- Yönetim panelinden sıra
- Önceden tanımlı vurgu rengi

Izgara:

- Geniş masaüstü: 3 kolon
- Tablet/küçük masaüstü: 2 kolon
- Mobil: 1 kolon
- Kartlar içerik kadar yükselir; eşit yükseklik zorunlu değildir.

Kart yüzeyi ana zeminden bir ton açıktır. Etiketler kenarlı küçük kutular yerine düşük opaklıklı dolu renk yüzeyleridir. Teknoloji seviyesini yüzde veya progress bar ile göstermek MVP kapsamı dışındadır; öznel puanlama yerine gerçek deneyim kayıtları tercih edilir.

### 8.5 Education

- Kurum, bölüm/program, tarih aralığı, konum ve kısa açıklama.
- Sertifikalar ayrı eğitim kayıtları veya opsiyonel alt öğeler olarak tutulabilir.

### 8.6 Hobbies

- Kısa, kişisel ve profesyonel olmayan bir ton.
- İkon + başlık + tek cümlelik açıklama düzeni.
- Fotoğraf zorunlu değildir; metin ağırlıklı sadelik korunur.

## 9. Görsel tasarım sistemi

### 9.1 Yönetilebilir renk paletleri

`Site Settings > Site color palette` alanı tüm genel site renklerini birlikte değiştirir. Seçim iki dil için ortaktır ve Duman Grafit varsayılan palettir. Önceki tasarım önerilerinin tamamı panelde bulunur:

- Ink & Mint
- Okyanus Mürekkebi, Grafit Adaçayı, Gece Mürdümü, Sıcak Antrasit
- Saf Antrasit, Duman Mavisi, Derin Petrol, Koyu Zeytin, Bordo Mürekkep, Kahve Mürekkebi
- Karbon Siyahı, Titanyum, Mavi Antrasit, Duman Grafit, Sıcak Grafit, Lav Taşı

Her seçenek ana zemin, yüzey, metin, ikincil metin ve vurgu tokenlarını tek paket olarak yönetir. Böylece yalnızca arka planın değişip metin kontrastının bozulması önlenir.

#### Varsayılan palet — “Duman Grafit”

| Token | Değer | Kullanım |
|---|---:|---|
| `--color-bg` | `#15171A` | Ana zemin |
| `--color-bg-raised` | `#1D2024` | Kart ve yumuşak yüzeyler |
| `--color-bg-hover` | `#272A2F` | Hover/focus yüzeyi |
| `--color-text` | `#F0F1F2` | Başlık ve ana metin |
| `--color-text-muted` | `#9A9EA3` | Açıklamalar |
| `--color-accent` | `#ADB3BA` | Aktif durum ve bağlantılar |
| `--color-accent-2` | `#8F9AA8` | İkincil vurgu |
| `--color-warm` | `#FBBF24` | Teknoloji etiketi vurgusu |
| `--color-danger-soft` | `#FB7185` | Nadir vurgu |

Renkler uygulama sırasında gerçek metin boyutlarıyla kontrast testinden geçirilir. Vurgu rengi küçük metinde tek başına kullanılmazsa daha açık varyant seçilir.

### 9.2 Tipografi

- Gövde ve başlık: Geist Sans veya Inter
- Teknik etiketler: Geist Mono veya JetBrains Mono
- `h1`: `clamp(2.5rem, 5vw, 4.5rem)`
- `h2`: `clamp(1.5rem, 2vw, 2rem)`
- Gövde: `16–18px`, satır yüksekliği `1.7`
- Navigasyon: `12–13px`, orta kalınlık, kontrollü harf aralığı

### 9.3 Boşluk ve köşeler

- Temel boşluk birimi: `4px`
- Sık kullanılan aralıklar: `8, 12, 16, 24, 32, 48, 64, 96, 128px`
- Kart köşesi: `24px`
- Etiket köşesi: `12px`
- Dil seçici köşesi: tam yuvarlak (`999px`)

### 9.4 “Çizgisiz” tasarım ilkesi

- Bölüm ayırıcı, kart kenarlığı ve dekoratif çizgi kullanılmaz.
- Hiyerarşi; boşluk, yazı ağırlığı, ton ve yumuşak gölge ile kurulur.
- Klavye odak göstergesi bu ilkenin erişilebilirlik istisnasıdır ve kaldırılmaz.
- Form alanı veya kontrol sınırı gerekirse dolu yüzey değişimi ve belirgin focus ring kullanılır.

## 10. Hareket ve etkileşim

- Sayfa girişleri: `opacity 0 → 1`, `translateY(8px → 0)`.
- Süre: `180–280ms`.
- Eğri: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Bölüm öğelerinde küçük bir stagger kullanılabilir; toplam bekleme `200ms`'yi aşmaz.
- Kart hover: en fazla `2px` dikey hareket ve hafif yüzey tonu değişimi.
- Büyük ölçekli parallax, sürekli hareket ve dikkat çeken glow kullanılmaz.
- Masaüstünde imleci takip eden geniş, nötr beyaz ve düşük opaklıklı bir aydınlatma kullanılır; paletin tonu değişmez.
- İmleç aydınlatması dokunmatik cihazlarda ve `prefers-reduced-motion: reduce` tercihinde devre dışıdır.
- `prefers-reduced-motion: reduce` durumunda transform, stagger, smooth scroll ve arka plan hareketi kapatılır.

Arka plandaki olası `0/1` efekti MVP sonrasında şu sınırlarla uygulanır:

- Opaklık en fazla `%3–5`.
- Metin kolonlarının doğrudan altında yoğunlaşmaz.
- Canvas/DOM yükü ana iş parçacığını meşgul etmez.
- Düşük güçlü cihazlarda ve azaltılmış hareket tercihinde tamamen kapanır.
- Kullanıcı etkileşimi için gerekli değildir; salt dekoratiftir ve erişilebilirlik ağacına girmez.

## 11. Dil seçici

### MVP kararı

Masaüstü ve mobilde sağ üstte sabit, küçük bir `TR / EN` kontrolü önerilir. Bu yerleşim:

- hemen fark edilir,
- sosyal ikonlarla karışmaz,
- mobil alt tarayıcı çubuğu ve gelecekteki iletişim butonuyla çakışmaz,
- sayfa aşağı kayarken erişilebilir kalır.

Kontrol tek bir bileşendir ve konumu tasarım token'ı/variant ile `top-right` veya `bottom-right` olarak değiştirilebilir. Böylece sonraki karar veri modelini veya sayfa yapısını etkilemez.

Davranış:

- Kullanıcının seçimi çerezde saklanır.
- İlk ziyarette tarayıcı dili yalnızca başlangıç önerisi olarak kullanılır.
- Dil değiştirirken mevcut bölüm `key` üzerinden çözülür ve hedef dildeki localized anchor'a dönüştürülür (`/tr#projeler → /en#projects`).
- Kontrolün erişilebilir adı “Switch language / Dili değiştir” olur.
- Bayrak yerine `TR` ve `EN` metni kullanılır; dil ile ülke eşleştirilmez.

## 12. Teknoloji seçimi

### Önerilen yığın

| Katman | Teknoloji | Karar nedeni |
|---|---|---|
| Uygulama | Next.js App Router | Sunucu bileşenleri, metadata, görsel optimizasyonu ve dil rotaları |
| Dil | TypeScript, strict mode | CMS modeli ile arayüz arasında tip güvenliği |
| Stil | Tailwind CSS + CSS theme variables | Hızlı uygulama ve merkezi tasarım token'ları |
| CMS | Payload CMS | Next.js içine gömülü yönetim paneli, localization, draft/version ve erişim kontrolü |
| Veritabanı | PostgreSQL | Düzenli ve ilişkisel portfolyo içeriği için uygun |
| İkon | Lucide React | Tutarlı, hafif ve erişilebilir ikon seti |
| Test | Vitest + Testing Library + Playwright + axe | Birim, bileşen, uçtan uca ve erişilebilirlik doğrulaması |
| Kod kalitesi | ESLint + Prettier | Tutarlı kod ve CI kontrolü |
| Dağıtım | Vercel veya Node.js/Docker | Next.js/Payload ile uyumlu iki geçerli yol |
| Medya | S3 uyumlu obje depolama | Kalıcı ve taşınabilir proje görselleri |

### Neden Payload CMS?

- Yönetim paneli aynı TypeScript/Next.js kod tabanında çalışır.
- İçerik alanları `tr` ve `en` olarak yerelleştirilebilir.
- Taslak, sürüm geçmişi ve canlı önizleme eklenebilir.
- Skills gibi tekrar eden ve sıralanabilir içerikleri kod değişikliği olmadan yönetir.
- Ayrı bir CMS uygulaması veya ikinci bir frontend deposu gerektirmez.

### Neden MVP'de animasyon kütüphanesi yok?

Bu sayfanın ihtiyaç duyduğu fade, kısa translate, hover ve smooth scroll davranışları CSS ve küçük bir `IntersectionObserver` yardımcı bileşeniyle karşılanabilir. Daha karmaşık geçiş gereksinimi oluşursa `Motion` daha sonra eklenebilir; başlangıç paketine alınmaz.

## 13. Uygulama mimarisi

```text
Ziyaretçi
   │
   ▼
Next.js /[lang] sayfası
   │  Server Components + cache tags
   ▼
Payload Local API ───────────► PostgreSQL
   │
   └─────────────────────────► S3 uyumlu medya deposu

Editör
   │
   ▼
/admin → Payload Admin → taslak / önizleme / yayın
                         │
                         └──► yayın sonrası içerik cache yenileme
```

Önerilen klasör yapısı:

```text
src/
  app/
    (frontend)/
      [lang]/
        page.tsx
        layout.tsx
    (payload)/
      admin/
      api/
  collections/
    Sections.ts
    Experience.ts
    Projects.ts
    SkillGroups.ts
    Education.ts
    Hobbies.ts
    Media.ts
    Users.ts
  globals/
    Profile.ts
    SiteSettings.ts
  components/
    layout/
    sections/
    ui/
  lib/
    content/
    i18n/
  styles/
    tokens.css
```

CMS yayın işlemi ilgili cache etiketini yeniler. İçerik değişiklikleri için örneğin `portfolio-content` etiketi kullanılabilir; ilk sürümde bölüm başına ayrı cache etiketi gereksizdir.

## 14. CMS içerik modeli

### Collection: `Sections`

Bu koleksiyon sol navigasyonun ve sağ içerik akışının tek kaynak noktasıdır. Kategoriler bu koleksiyondan oluşturulur.

- `key` — sistem içinde değişmeyen benzersiz kimlik (`about`, `projects` gibi)
- `type` — renderer seçimi: `about | experience | projects | skills | education | hobbies | custom`
- `label` — localized, navigasyonda ve bölüm başlığında gösterilen metin
- `anchor` — localized, URL hash değeri; örneğin TR `projeler`, EN `projects`
- `legacyAnchors[]` — localized, geçmiş bağlantıların bozulmaması için opsiyonel eski anchor'lar
- `enabled` — bölümün sitede gösterilip gösterilmeyeceği
- `showInNavigation` — içerikte bulunup navigasyonda gizlenebilmesini sağlar
- `order` — navigasyon ve içerik sırası
- `intro` — localized, opsiyonel bölüm giriş metni
- `customContent` — yalnızca `type: custom` için localized rich text
- `status: draft | published`

Panel üzerinden bölüm adı, dil başına URL anchor'ı, sıra ve görünürlük değiştirilebilir. Yeni standart dışı kategori gerektiğinde `custom` türüyle kod değişikliği olmadan metin ağırlıklı bir bölüm eklenebilir. Özel bir görsel düzen isteyen yeni bölüm türü ise güvenli ve tutarlı bir renderer için kod geliştirmesi gerektirir.

### Global: `Profile`

- `name`
- `jobTitle` — localized
- `tagline` — localized
- `about` — localized rich text
- `socialLinks[]`
  - `platform`
  - `url`
  - `label`
- `resume` — locale bazlı dosya veya bağlantı

### Global: `SiteSettings`

- varsayılan dil
- dil seçici konumu: `top-right | bottom-right`
- site renk paleti: 17 tanımlı seçenek; varsayılan `smoke-graphite`
- arka plan efekti: `off | gradient | binary`
- varsayılan bölüm ve navigasyon davranışı
- varsayılan SEO başlığı/açıklaması — localized
- Open Graph görseli
- analitik kimliği — opsiyonel

### Collection: `Experience`

- `company`
- `role` — localized
- `location` — localized
- `startDate`, `endDate`, `isCurrent`
- `summary` — localized
- `technologies[]`
- `companyUrl`
- `order`
- `status: draft | published`

### Collection: `Projects`

- `title` — localized
- `slug`
- `summary` — localized
- `role` — localized, opsiyonel
- `image` — opsiyonel
- `technologies[]`
- `liveUrl`, `repositoryUrl`
- `featured`
- `order`
- `status: draft | published`

### Collection: `SkillGroups`

- `title` — localized
- `iconKey` — izin verilen ikon listesinden seçim
- `colorKey` — izin verilen semantik renklerden seçim
- `skills[]`
  - `name` — gerekirse localized
  - `colorKey` — opsiyonel override
- `order`
- `status: draft | published`

Editör serbest hex rengi veya ham SVG giremez. Önceden tanımlı `cyan`, `mint`, `violet`, `amber`, `rose`, `slate` seçenekleri görsel tutarlılığı korur.

### Collection: `Education`

- `institution`
- `program` — localized
- `degree` — localized
- `startDate`, `endDate`
- `location` — localized
- `description` — localized
- `order`

### Collection: `Hobbies`

- `title` — localized
- `description` — localized
- `iconKey`
- `order`

### Sistem koleksiyonları

- `Users`: yalnızca yönetim paneli erişimi
- `Media`: proje görselleri, OG görselleri ve özgeçmiş dosyaları

### Yayın kuralları

- Anonim kullanıcı yalnızca yayınlanmış içeriği okuyabilir.
- Yönetim paneli ve taslaklar kimlik doğrulaması gerektirir.
- MVP'de tek `admin` rolü yeterlidir.
- Yayınlanacak kayıtta Türkçe ve İngilizce zorunlu alanlar tamamlanmış olmalıdır.
- Yayınlanacak her bölümde her iki dil için geçerli ve dil içinde benzersiz bir anchor bulunmalıdır.
- Silme öncesi yönetim panelinin standart onay akışı korunur.

## 15. Yerelleştirme stratejisi

- Next.js rota yapısı: `app/[lang]`.
- Desteklenen diller sabit allowlist: `tr`, `en`.
- Arayüz metinleri küçük tip güvenli sözlük dosyalarında tutulur.
- Yönetilebilir içerik Payload'ın alan bazlı localization özelliğinden gelir.
- Navigasyon etiketleri, bölüm başlıkları ve anchor'lar `Sections` koleksiyonundan aktif locale ile alınır.
- Dil değiştirici mevcut anchor'ı bölüm `key` değerine, ardından hedef locale anchor'ına eşler.
- Geçersiz veya eski bir anchor `legacyAnchors` ile eşleşirse güncel anchor'a yönlendirilir; hiçbir eşleşme yoksa sayfanın başı açılır.
- Tarihler `Intl.DateTimeFormat` ile aktif dile göre biçimlenir.
- `<html lang>` rota diliyle eşleşir.
- Her dil için canonical ve `hreflang` metadata üretilir.
- Eksik çeviri yayını bloklar; sessizce diğer dile düşmek yerine panelde doğrulama hatası gösterilir.

İki dil ve sınırlı arayüz metni için ilk sürümde ek i18n kütüphanesi zorunlu değildir. Çoğul kuralları, zengin mesaj biçimlendirme veya üçüncü bir dil geldiğinde `next-intl` değerlendirilebilir.

## 16. Erişilebilirlik gereksinimleri

- Hedef: WCAG 2.2 AA.
- İçeriğe atla bağlantısı bulunur.
- Doğru `header`, `nav`, `main`, `section`, `footer` semantiği kullanılır.
- Başlık sırası `h1 → h2 → h3` düzenindedir.
- Tüm etkileşimler klavye ile kullanılabilir.
- Görünür focus göstergesi kaldırılmaz; en az `2px` yüksek kontrastlı ring kullanılır.
- Normal metin kontrastı en az `4.5:1` olacak şekilde doğrulanır.
- Aktif menü yalnızca renkle anlatılmaz.
- Dekoratif ikonlar `aria-hidden` olur; anlamlı ikon bağlantıları erişilebilir ad taşır.
- Proje görsellerinde anlamlı `alt` metni, salt dekoratif görselde boş `alt` kullanılır.
- `prefers-reduced-motion` desteği zorunludur.
- Dil değiştirme, klavye odağını kaybettirmez ve bölüm bağlamını korur.
- Otomatik testler Playwright + axe ile, manuel testler klavye ve ekran okuyucu kontrolüyle yapılır.

## 17. SEO ve paylaşım

- Her dil için ayrı başlık ve açıklama.
- `Person` türünde JSON-LD.
- `sitemap.xml` içinde iki dil rotası.
- `robots.txt` ile `/admin` ve CMS uçlarının indeks dışı bırakılması.
- Proje görselleri için doğru boyut ve modern format.
- Open Graph ve sosyal paylaşım görseli.
- Sayfa içi bölüm bağlantıları ve özgeçmiş bağlantısı taranabilir gerçek `<a>` öğeleri olur.

## 18. Performans hedefleri

- Alan verisinde 75. yüzdelikte LCP `≤ 2.5s`.
- INP `≤ 200ms`.
- CLS `≤ 0.1`.
- İlk yükte gereksiz animasyon veya UI kütüphanesi gönderilmez.
- Sol navigasyon ve içerik mümkün olduğunca Server Component kalır.
- Client Component kapsamı yalnızca aktif bölüm gözlemi, dil seçici ve gerekirse menüdür.
- Görsellerde `next/image`, sabit boyut/en-boy oranı ve uygun `sizes` kullanılır.
- Fontlar yerel veya framework font optimizasyonuyla yüklenir; en fazla iki aile kullanılır.
- `0/1` arka plan efekti eklenirse ayrı performans bütçesi ve düşük cihaz testi gerekir.

## 19. Test planı

### Otomatik

- İçerik sorguları ve dönüşüm yardımcıları için birim testleri
- Dil sözlükleri ve locale allowlist testleri
- Skills kartları için bileşen testleri
- Altı bölümün görünmesi ve anchor navigasyonu için Playwright testleri
- Dil değişiminde hash koruma testi
- `/tr#projeler ↔ /en#projects` localized anchor eşleme testi
- Panelden bölüm etiketi/anchor/sıra değişikliğinin navigasyona yansıma testi
- Masaüstünde sticky sol kolon testi
- Mobilde tek kolon ve menü testi
- Yönetim panelinden yayınlanan içeriğin siteye yansıma testi
- axe ile temel WCAG ihlali taraması

### Manuel

- Chrome, Firefox, Safari ve Edge'in güncel sürümleri
- `390px`, `768px`, `1024px`, `1280px`, `1440px` görünüm kontrolleri
- Kısa masaüstü yüksekliği: `1280×720`
- Klavye ile tam sayfa gezinme
- VoiceOver veya NVDA ile başlık/navigasyon okuma
- Azaltılmış hareket modu
- Türkçe uzun metin ve İngilizce kısa metin taşma kontrolleri

## 20. Uygulama aşamaları

Proje temeli, panelden seçilebilen koyu renk sistemi, responsive yerleşim, iki dil rotası, localized anchor eşleme, Payload veri modeli, public site bileşenleri ve iki dil için otomatik WCAG taramaları tamamlandı. Gerçek içerik girişi yayın öncesine bırakıldı.

### Aşama 6 — Etkileşim, SEO ve önizleme

Durum: Tamamlandı. Yönetici oturumu ve ayrı önizleme sırrı ile korunan iki dilli Draft Mode/Live Preview akışı aktiftir. Önizleme kayıttan sonra route'u yeniler; public sayfalar kalıcı uygulama veri önbelleği kullanmadığı için bir sonraki istekte güncel published içeriği doğrudan okur.

Teslimler:

- Yumuşak geçişler ve reduced-motion
- Dil seçici ve `section key → localized anchor` dönüşümü
- CMS preview ve yayın sonrası cache yenileme
- Metadata, JSON-LD, sitemap, robots

Çıkış kriteri: Taslak önizleme ile yayınlanan sayfa ayrışmalı ve SEO çıktıları doğrulanmalı.

### Aşama 7 — QA ve yayın

Teslimler:

- Responsive, browser, erişilebilirlik ve performans testleri
- Üretim veritabanı ve medya depolama
- Yedekleme ve ortam değişkenleri dokümantasyonu
- Alan adı ve izleme kurulumu

Çıkış kriteri: Kritik hata yok, Core Web Vitals hedeflerine yakın/uygun ölçüm ve geri dönüş planı hazır.

### Aşama 8 — İsteğe bağlı görsel geliştirmeler

- `0/1` arka plan prototipi
- Tema varyantı
- Proje arşivi veya yazılar
- Daha gelişmiş sayfa geçişleri

Bu aşama MVP metrikleri ve okunabilirlik doğrulandıktan sonra ele alınır.

## 21. MVP kabul kriterleri

- Masaüstünde sol sütun ekran içinde sabit kalırken yalnızca ana içerik akar.
- Yayındaki navigasyon bağlantıları panel sırasına göre oluşur, localized anchor ile doğru bölüme gider ve aktif bölüm görünürdür.
- Mobilde yatay taşma yoktur.
- Panelde kategori adı/anchor/sıra/görünürlük ile tüm bölüm içeriklerini değiştirmek kod değişikliği gerektirmez.
- Türkçe ve İngilizce URL'ler doğrudan açılabilir ve indekslenebilir.
- Dil değişiminde mevcut bölüm korunur ve anchor hedef dile dönüşür (`/tr#projeler ↔ /en#projects`).
- Yayınlanmamış içerik anonim kullanıcıya görünmez.
- Dekoratif bölüm/kart çerçevesi veya ayırıcı çizgi bulunmaz.
- Klavye focus göstergeleri görünürdür.
- Azaltılmış hareket tercihinde hareketli efektler kapanır.
- Ana sayfada otomatik axe taramasında kritik veya ciddi ihlal bulunmaz.
- Production build, type-check, lint ve testler geçer.

## 22. Uygulama öncesi açık kararlar

| Karar | Önerilen varsayılan | Ne zaman kilitlenmeli? |
|---|---|---|
| Nihai renk paleti | Panelden seçilebilir 17 koyu tema; Duman Grafit varsayılan | Onaylandı ve uygulandı |
| Dil seçici konumu | Sağ üst, fixed | Görsel tasarım aşaması |
| Project görsel yoğunluğu | Yalnızca öne çıkan projelerde görsel | İçerik envanteri sırasında |
| Arka plan | Statik radyal gradient | MVP sonrası değerlendirme |
| Özgeçmiş | Dil başına ayrı PDF | İçerik aşaması |

Bu kararlar için component ve CMS modeli esnek bırakılmıştır; renk veya dil seçici konumunun daha sonra değişmesi mimari yeniden çalışma gerektirmez.
