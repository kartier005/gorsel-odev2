# 🎨 PageCraft - GrapesJS Web Sayfa Editörü

GrapesJS kütüphanesi kullanılarak geliştirilmiş, web üzerinde görsel (drag & drop) HTML sayfa tasarımı yapabilen uygulama.

![GrapesJS](https://img.shields.io/badge/GrapesJS-0.21.13-orange?logo=javascript)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Proje Hakkında

**PageCraft**, [GrapesJS](https://grapesjs.com/) açık kaynak kütüphanesini kullanarak web tarayıcı üzerinden **sürükle-bırak** yöntemiyle HTML sayfaları tasarlamanıza olanak tanır. Tasarladığınız sayfaları **dosya olarak kaydedebilir**, düzenleyebilir ve önizleyebilirsiniz.

### 🔗 Referans Kaynaklar

- **GrapesJS Resmi Sitesi**: [https://grapesjs.com/](https://grapesjs.com/)
- **GrapesJS Canlı Demo**: [https://grapesjs.com/demo.html](https://grapesjs.com/demo.html)
- **GrapesJS GitHub**: [https://github.com/GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs)

### ✨ Özellikler

- 🖱️ **Sürükle & Bırak Editör** — GrapesJS ile görsel sayfa tasarımı
- 📄 **Sayfa Yönetimi** — Birden fazla sayfa oluşturma, düzenleme, silme
- 💾 **Kaydetme (Dosya)** — Tasarımlar JSON dosya olarak sunucuya kaydedilir
- 🎨 **Hazır Şablonlar** — Boş Sayfa, Landing Page, Portfolyo şablonları
- 👁️ **Canlı Önizleme** — Tasarlanan sayfanın ayrı sekmede önizlenmesi
- { } **Kod Görüntüleme** — Oluşturulan HTML ve CSS kodlarını görme
- 📱 **Responsive Tasarım Modu** — Masaüstü, Tablet, Mobil görünüm kontrolü
- 🧩 **Blok Bileşenler** — Metin, resim, video, sütunlar, butonlar ve daha fazlası
- 🎛️ **Stil Yönetimi** — CSS özelliklerini görsel panel ile düzenleme
- 🐳 **Docker ile Çalışma** — Tek komutla kurulum ve başlatma

---

## 🛠️ Teknoloji Stack

| Katman | Teknoloji | Açıklama |
|--------|-----------|----------|
| **Editör** | [GrapesJS v0.21.13](https://grapesjs.com/) | Açık kaynak web sayfa oluşturucu |
| **GrapesJS Eklentileri** | preset-webpage, blocks-basic | Hazır bloklar ve web sayfası araçları |
| **Backend** | FastAPI (Python 3.11) | RESTful API, sayfa CRUD işlemleri |
| **Frontend** | HTML5, CSS3, Vanilla JS | Sayfa yönetim paneli ve editör arayüzü |
| **Web Sunucu** | Nginx | Statik dosya sunma, reverse proxy |
| **Veri Saklama** | JSON dosya (Dosya bazlı) | Docker volume ile kalıcı depolama |
| **Containerization** | Docker & Docker Compose | Multi-container orkestrasyon |

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- [Docker](https://docs.docker.com/get-docker/) yüklü olmalıdır
- [Docker Compose](https://docs.docker.com/compose/install/) yüklü olmalıdır

### Çalıştırma

```bash
# Projeyi klonlayın
git clone https://github.com/KULLANICI_ADI/pagecraft.git
cd pagecraft

# Docker ile çalıştırın
docker-compose up --build
```

Uygulama başladıktan sonra:

| Servis | URL | Açıklama |
|--------|-----|----------|
| 🌐 **Web Uygulaması** | [http://localhost:3000](http://localhost:3000) | Ana uygulama (Editör) |
| 🔌 **Backend API** | [http://localhost:8000](http://localhost:8000) | REST API |
| 📄 **API Docs (Swagger)** | [http://localhost:8000/docs](http://localhost:8000/docs) | Otomatik API dokümantasyonu |

### Durdurma

```bash
docker-compose down
```

---

## 📖 Kullanım Kılavuzu

### 1. Yeni Sayfa Oluşturma
1. Ana sayfada **"+ Yeni Sayfa"** butonuna tıklayın
2. Sayfa adını girin (örn: "Ana Sayfa")
3. İsterseniz bir hazır şablon seçin (Boş Sayfa, Landing Page, Portfolyo)
4. **"Oluştur"** butonuna tıklayın

### 2. Sayfa Düzenleme (GrapesJS Editörü)
- **Sol Panel**: Sürüklenebilir blok bileşenler (metin, resim, sütun vb.)
- **Orta Alan**: Görsel düzenleme alanı (canvas)
- **Sağ Panel**: Seçili elementin stil ve ayarları
- **Blokları** sol panelden canvas üzerine sürükle-bırak yaparak ekleyin
- Herhangi bir elemana tıklayarak stilini sağ panelden düzenleyin

### 3. Kaydetme
- **💾 Kaydet** butonuna veya `Ctrl+S` kısayoluna basın
- Tasarım sunucuya JSON dosyası olarak kaydedilir

### 4. Önizleme
- **👁️ Önizle** butonuna tıklayın
- Tasarlanan sayfa yeni bir sekmede açılır

### 5. Kodu Görme
- **{ } Kod** butonuna tıklayın
- Oluşturulan HTML ve CSS kodlarını görüntüleyin

### 6. Responsive Test
- Üst çubuktaki cihaz butonlarıyla (🖥️ 📱 📲) farklı ekran boyutlarını test edin

---

## 📁 Proje Yapısı

```
pagecraft/
├── docker-compose.yml          # Docker servisleri tanımı
├── README.md                   # Proje dokümantasyonu
├── .gitignore                  # Git ignore kuralları
├── backend/
│   ├── Dockerfile              # Backend container tanımı
│   ├── requirements.txt        # Python bağımlılıkları
│   └── main.py                 # FastAPI uygulama kodu (CRUD + GrapesJS storage)
└── frontend/
    ├── Dockerfile              # Frontend container tanımı
    ├── nginx.conf              # Nginx yapılandırması (reverse proxy)
    ├── index.html              # Ana HTML (sayfa yönetimi + editör)
    ├── style.css               # CSS stilleri (dark mode, GrapesJS tema)
    └── app.js                  # JavaScript (sayfa yönetimi, GrapesJS entegrasyonu)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/api/pages` | Tüm sayfaları listele |
| `GET` | `/api/pages/{id}` | Belirli sayfayı getir |
| `POST` | `/api/pages` | Yeni sayfa oluştur |
| `PUT` | `/api/pages/{id}` | Sayfayı güncelle |
| `DELETE` | `/api/pages/{id}` | Sayfayı sil |
| `GET` | `/api/pages/{id}/preview` | Sayfanın HTML önizlemesi |
| `GET` | `/api/gjs/load/{id}` | GrapesJS editör verisini yükle |
| `POST` | `/api/gjs/store/{id}` | GrapesJS editör verisini kaydet |

### Örnek İstekler

```bash
# Yeni sayfa oluştur
curl -X POST http://localhost:8000/api/pages \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana Sayfa", "html": "<h1>Merhaba</h1>", "css": "h1 { color: blue; }"}'

# Tüm sayfaları listele
curl http://localhost:8000/api/pages

# Sayfayı güncelle
curl -X PUT http://localhost:8000/api/pages/SAYFA_ID \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Güncellendi</h1>"}'
```

---

## 🏗️ Mimari

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Tarayıcı  │  HTTP   │    Nginx     │  Proxy  │   FastAPI   │
│  (GrapesJS  │ ──────> │  (Frontend)  │ ──────> │  (Backend)  │
│   Editor)   │         │  Port: 3000  │  /api/  │  Port: 8000 │
└─────────────┘         └──────────────┘         └──────┬──────┘
                                                        │
                                                        ▼
                                                 ┌─────────────┐
                                                 │  JSON Dosya  │
                                                 │  (Volume)    │
                                                 └─────────────┘
```

### Veri Akışı
1. Kullanıcı GrapesJS editöründe sayfa tasarlar
2. **Kaydet** butonuna basıldığında HTML, CSS ve GrapesJS bileşen verileri API'ye gönderilir
3. FastAPI backend verileri JSON dosyasına yazar (Docker volume ile kalıcı)
4. Sayfa tekrar açıldığında veriler API'den yüklenir ve GrapesJS editörüne aktarılır

---

## 🧪 Geliştirme Notları

### GrapesJS Entegrasyonu
GrapesJS kütüphanesi CDN üzerinden yüklenmektedir. Kullanılan eklentiler:
- **grapesjs-preset-webpage**: Web sayfası için hazır araç seti
- **grapesjs-blocks-basic**: Temel HTML blokları (metin, resim, video, sütun vb.)

### Neden Dosya Bazlı Depolama?
Proje basitliği ve Docker volume uyumluluğu açısından JSON dosya tabanlı depolama tercih edilmiştir. Bu sayede ek bir veritabanı container'ına gerek kalmadan veriler kalıcı olarak saklanmaktadır.

### Dark Mode Tema
GrapesJS'in varsayılan teması CSS override'ları ile özel bir dark mode temasına dönüştürülmüştür. Bu sayede modern ve göz yormayan bir editör deneyimi sağlanmıştır.

--