
const model = require('../models/jokebookModel');

async function getCategories(req, res) {
    try {
        const categories = await model.getCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function getJokesByCategory(req, res) {
    const category = req.params.category;
    const limit = req.query.limit;
    try {
        const jokes = await model.getJokesbyCategory(category, limit);
        if (jokes.length === 0) {
            return res.status(404).send("No jokes found for category: " + category);
        }
        res.json(jokes);
    } catch (err) {
        console.error(err);
            res.status(500).send("Server error");
        }
    }  

async function getRandomJoke(req, res) {
        try {
            const joke = await model.getRandomJoke();
            res.json(joke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
}

async function addJoke(req, res) {
    const { category, setup, delivery } = req.body;
    if (!category || !setup || !delivery) {
        return res.status(400).send("Missing required fields: category, setup, delivery");
    }
    try {
        await model.addJoke(category, setup, delivery);
        const updated = await model.getJokesbyCategory(category);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};
