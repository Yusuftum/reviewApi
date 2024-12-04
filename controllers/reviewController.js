const Review = require('../models/Review');
const Film = require('../models/Film');

//bütün eleştirileri listeleme
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('film', 'title');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//eleştiriyi İd'ye göre getirme 
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('film', 'title');
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//eleştri ekleeme
exports.addReview = async (req, res) => {
    try {
        const film = await Film.findById(req.params.filmId);
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }

        const { author, text, rating } = req.body;
        const review = new Review({ author, text, rating, film: req.params.filmId, user: req.user.id });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//kullanıcının kendi eklediği eleştiriyi silme 
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Eleştiriyi sadece ekleyen kullanıcı silebilir
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'User not authorized to delete this review' });
        }
        await Review.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

