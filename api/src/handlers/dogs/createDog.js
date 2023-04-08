const createDog = require('../../controllers/dogControllers/createDog');

module.exports = async (req, res) => {
    const { name, image, height, weight, lifespan, temperament } = req.body;

    try {
        const newDog = await createDog({ name, image, height, weight, lifespan, temperament });
        res.status(201).json(newDog);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}