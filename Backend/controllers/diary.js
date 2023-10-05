const Diary = require('../models/Diary');

async function index(req, res) {
    try {
        const diary = await Diary.getAll();
        res.status(200).json(diary);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function showID (req, res) {
    try {
        let id = parseInt(req.params.id);
        const diary = await Diary.getOneByID(id);
        res.status(200).json(diary)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showCategory (req, res) {
    try {
        let category = req.params.category.toLowerCase();
        const diary = await Diary.getOneByCategory(category);
        res.status(200).json(diary)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showDate (req, res) {
    try {
        let date = req.params.date;
        console.log(date)
        const diary = await Diary.getOneByDate(date);
        res.status(200).json(diary)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newDiary = await Diary.create(data);
        res.status(201).json(newDiary);
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
        let id = parseInt(req.params.id);
        const diary = await Diary.getOneByID(id);
        const result = await diary.destroy();
        res.status(204).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
};

module.exports = { index, showID, showDate, showCategory, create, update, destroy }
