const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 8003;

const API_KEY = "uas-sukses-tst";
const CATALOG_URL = "https://darryl.tugastst.my.id/books";
const REVIEW_URL = "https://farhan.tugastst.my.id/reviews/book";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/book-details/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const [catalogRes, reviewRes] = await Promise.all([
            axios.get(`${CATALOG_URL}/${bookId}`, { headers: { 'uas-api-key': API_KEY }, timeout: 5000 }),
            axios.get(`${REVIEW_URL}/${bookId}`, { headers: { 'uas-api-key': API_KEY }, timeout: 5000 })
        ]);

        const integratedData = {
            integration_info: "Layanan Integrasi Katalog & Review - Darryl & Farhan",
            book_info: catalogRes.data.data,
            reviews_info: {
                average_rating: reviewRes.data.average_rating,
                total_reviews: reviewRes.data.reviews ? reviewRes.data.reviews.length : 0,
                user_reviews: reviewRes.data.reviews || []
            }
        };
        res.json({ status: "success", data: integratedData });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Gagal integrasi data STB.", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Integration Service running on port ${PORT}`);
});