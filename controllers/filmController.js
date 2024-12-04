const Film = require('../models/Film');

//bütün filmleri listeleme 
exports.getFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//bir filmi İd'si ile getirme 
exports.getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }
        res.json(film);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//film oluşturma 
exports.createFilm = async (req, res) => {
    try {
        const { title, director, releaseDate } = req.body;
        const film = new Film({ title, director, releaseDate, user: req.user.id });
        await film.save();
        res.status(201).json(film);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//kullanıcının eklediği filmi silmesi
exports.deleteFilm = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }

        // Filmi sadece ekleyen kullanıcı silebilir
        if (film.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'User not authorized to delete this film' });
        }
        await Film.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Film removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
