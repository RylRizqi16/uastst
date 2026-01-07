const express = require('express');
const app = express();
const PORT = 8002;

const API_KEY = "uas-sukses-tst";

// Database Dummy
const books = [
    {
        id: 101,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        synopsis: "Kisah perjuangan sepuluh anak di Belitong mengejar mimpi mereka.",
        published_year: 2005,
        stock: 5
    },
    {
        id: 102,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        synopsis: "Kisah Minke di masa kolonial yang memperjuangkan hak asasinya.",
        published_year: 1980,
        stock: 3
    },
    {
        id: 103,
        title: "Filosofi Kopi",
        author: "Dee Lestari",
        synopsis: "Kumpulan cerita pendek tentang makna kehidupan di balik secangkir kopi.",
        published_year: 2006,
        stock: 10
    }
];

// Middleware Authentication
const authenticate = (req, res, next) => {
    const key = req.headers['uas-api-key'];
    if (key === API_KEY) {
        next();
    } else {
        res.status(403).json({ status: "error", message: "Forbidden: API Key tidak valid" });
    }
};

app.get('/books/:id', authenticate, (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (book) {
        res.json({ status: "success", data: book });
    } else {
        res.status(404).json({ status: "error", message: "Buku tidak ditemukan" });
    }
});

app.listen(PORT, () => {
    console.log(`Catalog Service running on port ${PORT}`);
});