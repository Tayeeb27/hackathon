const Diary = require('../models/Diary');

async function index(req, res) {
    try {
        const diary = await Diary.getAll();
        res.status(200).json(diary);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function show (req, res) {
    try {
        let name = req.params.name.toLowerCase();
        const diary = await Diary.getOneByCountryName(name);
        res.status(200).json(diary)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newCountry = await Diary.create(data);
        res.status(201).json(newCountry);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update (req, res) {
    try {
        const name = req.params.name.toLowerCase()
        const data = req.body;
        const diary = await Diary.getOneByCountryName(name);
        const result = await diary.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        const name = req.params.name.toLowerCase();
        const diary = await Diary.getOneByCountryName(name);
        const result = await diary.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({error: err.message})
    }
};

module.exports = { index, show, create, update, destroy }