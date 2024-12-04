const express = require('express');
const { getReviews, getReviewById, addReview, deleteReview} = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/reviews', protect, getReviews);//bütün eleştirileri listleme rotası
router.get('/reviews/:id', protect, getReviewById);//bir eleştiriyi İd'ye göre getirme 
router.post('/films/:filmId/reviews', protect, addReview);//eleştiri oluşturma rotası 
router.delete('/reviews/:id', protect, deleteReview)//eleştiri silme rotası

module.exports = router;
