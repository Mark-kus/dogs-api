const createDog = require('../../controllers/dogController');

module.exports = async (req, res) => {
    const { name, image, height, weight, lifespan } = req.body;

    // Verifico tener todos los datos
    if (![name, image, height, weight, lifespan].every(Boolean)) throw new TypeError('Faltan datos');

    try {
        const newDog = await createDog({ name, image, height, weight, lifespan });
        res.status(201).json(newDog);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}