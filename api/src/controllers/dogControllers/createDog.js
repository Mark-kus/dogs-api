const { Dog, Temperament } = require('../../db/db.js');

module.exports = async (name, image, height, weight, lifespan, temperament) => {
    const newDog = await Dog.create({
        weight: weight,
        height: height,
        name: name,
        lifespan: lifespan,
        image: image,
    });
    await temperament.map(async (temp) => {
        const temper = await Temperament.findOne({ where: { name: temp } });
        await newDog.addTemperament(temper);
    });

    const returnedTemps = temperament.map(temp => temp.trim()).join(', ');
    return {
        weight: weight,
        height: height,
        name: name,
        lifespan: lifespan,
        image: image,
        temperament: returnedTemps,
        id: newDog.dataValues.id,
        created: true,
    };
}