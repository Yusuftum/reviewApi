const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Film', filmSchema);
