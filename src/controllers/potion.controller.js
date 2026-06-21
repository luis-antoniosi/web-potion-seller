import Potion from "../models/potion.js";

async function findAll(req, res) {
    try {
        const results = await Potion.findAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function findById(req, res) {
    try {
        const results = await Potion.findByPk(req.params.id);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const results = await Potion.create({
            name: req.body.name,
            description: req.body.description,
            photo: req.body.photo,
            price: req.body.price
        });
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteById(req, res) {
    try {
        const results = await Potion.destroy({ where: { id: req.params.id } });
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const results = await Potion.update({
            name: req.body.name,
            description: req.body.description,
            photo: req.body.photo,
            price: req.body.price
        },
            { where: { id: req.params.id } }
        );
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    findAll,
    findById,
    create,
    deleteById,
    update
}