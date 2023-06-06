const deleteDog = require('../../controllers/dogControllers/deleteDog.js');

module.exports = (req, res) => {
    const { id } = req.params
    try {
        deleteDog(id);
        res.status(204).json("Breed deleted");
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}