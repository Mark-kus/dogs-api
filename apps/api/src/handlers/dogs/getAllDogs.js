const getDogs = require('../../controllers/dogControllers/getDogs');

module.exports = async (req, res) => {
    try {
        const allDogs = await getDogs();
        res.status(200).json(allDogs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}