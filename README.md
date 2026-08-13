# 📇 Contacts API - Validation, Pagination & Filtering (GoIT Node.js HW #04)

Bu proje, GoIT Node.js eğitimi kapsamında geliştirilen **İletişim Yönetimi API** uygulamasının Joi doğrulama mimarisi, MongoDB ObjectId kontrolü, gelişmiş sayfalandırma, sıralama ve filtreleme özellikleri eklenmiş `hw4-validation` sürümüdür.

🌐 **[Canlı API (Render.com)](https://contacts-app-u3qm.onrender.com/)**  
💻 **[Kaynak Kodlar (GitHub hw4-validation Branch)](https://github.com/UmutSaatci/nodejs-hw-mongodb)**

---

### 🚀 Gelişmiş Özellikler & Backend Mimarisi (Features & Backend Architecture)

* 🛡️ **Veri Doğrulama (Joi Validation Middleware):** `POST /contacts` ve `PATCH /contacts/:contactId` rotaları için `validateBody` middleware'i entegre edilmiştir. String alanlar için minimum 3, maksimum 20 karakter sınırlandırması uygulanmıştır.
* 🔍 **ID Geçerlilik Kontrolü (isValidId):** URL üzerinden gelen `:contactId` parametresinin geçerli bir MongoDB `ObjectId` olup olmadığını denetleyen `isValidId` middleware'i yazılmış ve ilgili tüm rotalara uygulanmıştır.
* 📄 **Gelişmiş Sayfalandırma (Pagination):** `GET /contacts` rotasına `page` (varsayılan 1) ve `perPage` (varsayılan 10) parametreleri eklenmiştir. Yanıt içinde `totalItems`, `totalPages`, `hasPreviousPage` ve `hasNextPage` gibi meta veriler standartlara uygun şekilde dönülmektedir.
* 📊 **Dinamik Sıralama (Sorting):** Rehberdeki kişileri isim veya diğer niteliklere göre sıralamak için `sortBy` ve `sortOrder` (`asc` / `desc`) parametreleri kurgulanmıştır.
* 🎛️ **Gelişmiş Filtreleme (Filtering - İsteğe Bağlı Görev):** Rehber kayıtlarını `type` (work, home, personal) ve `isFavourite` (true/false) özelliklerine göre filtreleme altyapısı kurulmuştur.

---

### 🛣️ API Rotaları ve İstek Formatları (API Endpoints)

#### 1. Tüm İletişimleri Getir (Sayfalandırma, Sıralama ve Filtreleme Dahil)
* **Endpoint:** `GET /contacts`
* **Örnek Sorgu (Query):** `/contacts?page=2&perPage=4&sortBy=name&sortOrder=asc&isFavourite=true`
* **Standart Yanıt Formatı:**
```json
{
    "status": 200,
    "message": "Successfully found contacts!",
    "data": {
        "data": [ /* iletişim nesneleri */ ],
        "page": 2,
        "perPage": 4,
        "totalItems": 6,
        "totalPages": 2,
        "hasPreviousPage": true,
        "hasNextPage": false
    }
}
```

#### 2. Diğer Rotalar
* `GET /contacts/:contactId` — Belirli bir iletişimi getirir (`isValidId` korumalı).
* `POST /contacts` — Yeni iletişim ekler (`validateBody` korumalı).
* `PATCH /contacts/:contactId` — İletişimi günceller (`isValidId` ve `validateBody` korumalı).
* `DELETE /contacts/:contactId` — İletişimi siler (`isValidId` korumalı).

---

### 📂 Proje Klasör Yapısı (Directory Structure)

```text
src/
├── controllers/
│   └── contacts.js       # Rota mantığı ve servis çağrıları
├── db/
│   ├── initMongo.js      # MongoDB bağlantı kurulumu
│   └── models/
│       └── contact.js    # Mongoose Şeması ve Modeli
├── middlewares/
│   ├── isValidId.js      # ObjectId doğrulama katmanı
│   └── validateBody.js   # Joi şema doğrulama katmanı
├── routers/
│   └── contacts.js       # Rota tanımlamaları ve middleware entegrasyonu
├── services/
│   └── contacts.js       # Mongoose (skip, limit, sort) veritabanı sorguları
├── validation/
│   └── contacts.js       # Joi doğrulama şemaları
├── server.js             # Express uygulama kurulumu
└── index.js              # Uygulama giriş noktası
```

---

### 💻 Kullanılan Teknolojiler (Tech Stack)

* 🟢 **Node.js** & 🚂 **Express.js** — Backend çalışma ortamı ve API mimarisi
* 🍃 **MongoDB** & 🐬 **Mongoose** — Veritabanı ve veri modelleme katmanı
* 📐 **Joi** — Girdi verileri doğrulama (Validation) kütüphanesi
* 📦 **Dotenv** — Çevresel değişkenlerin yönetimi
* 🚀 **Render.com** — Canlı dağıtım (Deployment) platformu

---

### 🛠️ Projeyi Yerelde Çalıştırma (Installation)

1. Depoyu klonlayın ve ilgili dala geçiş yapın:
   ```bash
   git clone https://github.com
   cd DEPO_ADINIZ
   git checkout hw4-validation
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Kök dizinde bir `.env` dosyası oluşturup gerekli değişkenleri tanımlayın:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```
