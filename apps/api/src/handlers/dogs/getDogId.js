const getDogById = require('../../controllers/dogControllers/getDogById');

module.exports = async (req, res) => {
    const { id } = req.params;
    // Identifico donde está el perro buscado
    const source = isNaN(id) ? 'db' : 'api';
    try {
        const dog = await getDogById(id, source);
        res.status(200).json(dog);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}