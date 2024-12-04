const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
