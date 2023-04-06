const { Dog } = require('../db/db.js');

const createDog = async (name, image, height, weight, lifespan) => {
    const newDog = await Dog.create({ name, image, height, weight, lifespan });
    // Asociar:
    return newDog;
}

module.exports = { createDog };