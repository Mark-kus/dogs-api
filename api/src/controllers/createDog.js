const { Dog, Temperament } = require('../db/db.js');

module.exports = async (name, image, height, weight, lifespan, temperament) => {
    const newDog = await Dog.create({
        weight,
        height,
        name,
        lifespan,
        image,
    });
    temperament.map(async (temp) => {
        const temper = await Temperament.findOne({ where: { name: temp } });
        await newDog.addTemperament(temper);
    })

    return newDog;
}