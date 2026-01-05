# Book Catalog Microservice

Microservice Katalog Buku untuk Sistem Perpustakaan Terpadu.

**Maintainer:** Darryl Rizqi

## Deskripsi

Layanan REST API untuk mengelola katalog buku yang menyediakan fitur:
- Melihat daftar semua buku
- Melihat detail buku berdasarkan ID
- Menambahkan buku baru

## Teknologi

- **Runtime:** Node.js 18
- **Framework:** Express.js
- **Port:** 8002
- **Container:** Docker (Alpine)

## Cara Menjalankan

### Menggunakan Node.js

```bash
# Install dependencies
npm install

# Jalankan server
npm start
```

### Menggunakan Docker

```bash
# Build image
docker build -t book-catalog .

# Jalankan container
docker run -p 8002:8002 book-catalog
```

## Autentikasi

Semua endpoint (kecuali `/`) memerlukan API Key pada header:

```
uas-api-key: uas-sukses-tst
```

## API Endpoints

### 1. Health Check
```
GET /
```
**Response:**
```json
{
  "service": "Book Catalog Service",
  "status": "active",
  "maintainer": "Darryl Rizqi",
  "total_books": 4
}
```

---

### 2. Mendapatkan Semua Buku
```
GET /books
Headers: uas-api-key: uas-sukses-tst
```
**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 101,
      "title": "Laskar Pelangi",
      "author": "Andrea Hirata",
      "synopsis": "Kisah perjuangan anak-anak Belitong mengejar mimpi.",
      "published_year": 2005,
      "stock": 5
    }
  ]
}
```

---

### 3. Mendapatkan Buku Berdasarkan ID
```
GET /books/:id
Headers: uas-api-key: uas-sukses-tst
```
**Response Sukses:**
```json
{
  "status": "success",
  "data": {
    "id": 101,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "synopsis": "Kisah perjuangan anak-anak Belitong mengejar mimpi.",
    "published_year": 2005,
    "stock": 5
  }
}
```

**Response Error (404):**
```json
{
  "status": "error",
  "message": "Buku tidak ditemukan"
}
```

---

### 4. Menambahkan Buku Baru
```
POST /books
Headers: 
  uas-api-key: uas-sukses-tst
  Content-Type: application/json
```
**Body (JSON):**
```json
{
  "title": "Judul Buku",
  "author": "Nama Penulis",
  "synopsis": "Sinopsis buku (opsional)",
  "published_year": 2024,
  "stock": 10
}
```
**Response (201):**
```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 105,
    "title": "Judul Buku",
    "author": "Nama Penulis",
    "synopsis": "Sinopsis buku",
    "published_year": 2024,
    "stock": 10
  }
}
```

## Integrasi

Service ini terintegrasi dengan:
- **Review Service** (`https://farhan.tugastst.my.id/reviews/book`) - Untuk mendapatkan ulasan dan rating buku

## Struktur Proyek

```
├── index.js        # Entry point & API routes
├── index.html      # Frontend UI terintegrasi
├── package.json    # Dependencies
├── Dockerfile      # Container configuration
└── README.md       # Dokumentasi
```

## Lisensi

UAS TST - 2025
