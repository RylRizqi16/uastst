const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8002; 

app.use(cors());
app.use(bodyParser.json());

const API_KEY = "uas-sukses-tst";

const authenticate = (req, res, next) => {
    const userKey = req.headers['uas-api-key'];
    if (userKey && userKey === API_KEY) {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "Akses Ditolak: API Key tidak valid."
        });
    }
};

let books = [
    {
        id: 101,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        synopsis: "Kisah perjuangan anak-anak Belitong mengejar mimpi.",
        published_year: 2005,
        stock: 5
    },
    {
        id: 102,
        title: "Clean Code",
        author: "Robert C. Martin",
        synopsis: "Panduan menulis kode yang rapi dan mudah dipelihara.",
        published_year: 2008,
        stock: 3
    },
    {
        id: 103,
        title: "Atomic Habits",
        author: "James Clear",
        synopsis: "Perubahan kecil yang memberikan hasil luar biasa.",
        published_year: 2018,
        stock: 10
    },
    {
        id: 104,
        title: "Misteri Rumah Kosong",
        author: "S. Mara Gd",
        synopsis: "Novel thriller detektif lokal yang menegangkan.",
        published_year: 1995,
        stock: 2
    }
];

app.get('/', (req, res) => {
    res.json({
        service: "Book Catalog Service",
        status: "active",
        maintainer: "Darryl Rizqi", 
        total_books: books.length
    });
});

app.get('/books', authenticate, (req, res) => {
    res.json({
        status: "success",
        data: books
    });
});

app.get('/books/:id', authenticate, (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (book) {
        res.json({
            status: "success",
            data: book
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Buku tidak ditemukan"
        });
    }
});

app.post('/books', authenticate, (req, res) => {
    const data = req.body;
    
    if (!data.title || !data.author) {
        return res.status(400).json({ message: "Judul dan Penulis wajib diisi" });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 101,
        title: data.title,
        author: data.author,
        synopsis: data.synopsis || "-",
        published_year: data.published_year || new Date().getFullYear(),
        stock: data.stock || 0
    };

    books.push(newBook);
    res.status(201).json({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: newBook
    });
});

app.listen(PORT, () => {
    console.log(`Layanan Katalog Buku berjalan di port ${PORT}`);
});