const Comment = require('../models/Comment');
const Review = require('../models/Review');

//bütün yorumları listeleme 
exports.getComment = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//yorumları İd'ye göre getir 
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('review', 'text');
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//yorum ekleme 
exports.addComment = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        const { author, text } = req.body;
        const comment = new Comment({ author, text, review: req.params.reviewId, user: req.user.id }); 
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//yorumu silme 
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Yorumu sadece ekleyen kullanıcı silebilir
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'User not authorized to delete this comment' });
        }
        await Comment.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

