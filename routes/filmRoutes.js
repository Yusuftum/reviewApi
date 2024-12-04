const express = require('express');
const { getFilms, getFilmById, createFilm, deleteFilm} = require('../controllers/filmController');
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/films', protect, getFilms);//filmleri listeleme rotası 
router.get('/films/:id',  protect, getFilmById);//filmleri id kullanarak getirme rotası
router.post('/films', protect, createFilm);//film oluşturma rotası 
router.delete('/films/:id', protect, deleteFilm);//film silme rotası 

module.exports = router;
