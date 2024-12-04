const express = require('express');
const { addComment, getComment, getCommentById, deleteComment} = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/comments', protect, getComment);//bütün yorumları listeleme rotası
router.get('/comments/:id', protect, getCommentById);//İd'ye göre yourmları bulma rotası 
router.post('/reviews/:reviewId/comments', protect, addComment);//bir yorum ekleme rotası
router.delete('/comments/:id', protect, deleteComment);//bir yorum silme rotası

module.exports = router;
