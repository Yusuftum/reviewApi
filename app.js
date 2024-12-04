require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const filmRoutes = require('./routes/filmRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

// Veritabanına bağlan
connectDB();

// Body Parsing Middleware
app.use(express.json());

// Film Rotaları
app.use('/api', filmRoutes);

// Eleştiri Rotaları
app.use('/api', reviewRoutes);

// Yorum Rotaları
app.use('/api', commentRoutes);

// Kullanıcı Rotaları
app.use('/api', userRoutes);

// Hata Yönetimi Middleware'i
app.use(errorHandler);

// Sunucuyu Dinle
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
