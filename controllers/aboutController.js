const About = require('../models/aboutModel');

exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (err) {
        console.error('Error fetching about:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.createAbout = async (req, res) => {
    try {
        const about = await About.create(req.body);
        res.status(201).json(about);
    } catch (err) {
        console.error('Error creating about:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await About.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedAbout = await About.findOne({ where: { id: id } });
            res.status(200).json(updatedAbout);
        } else {
            throw new Error('About not found');
        }
    } catch (err) {
        console.error('Error updating about:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await About.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send("About deleted");
        } else {
            throw new Error("About not found");
        }
    } catch (err) {
        console.error('Error deleting about:', err);
        res.status(500).json({ error: err.message });
    }
}