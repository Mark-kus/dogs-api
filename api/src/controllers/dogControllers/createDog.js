const { Dog, Temperament } = require('../../db/db.js');

module.exports = async (name, image, height, weight, lifespan, temperament) => {
    nameCased = name.slice(0, 1).toUpperCase() + name.slice(1, name.length).toLowerCase();
    for (let i = 1; i < nameCased.length; i++) {
        if (nameCased.charAt(i) === ' ') {
            nameCased = nameCased.slice(0, i + 1) + nameCased.slice(i + 1, i + 2).toUpperCase() + nameCased.slice(i + 2, nameCased.length);
        }
    }
    const newDog = await Dog.create({
        weight: weight,
        height: height,
        name: nameCased,
        lifespan: lifespan,
        image: image,
    });
    await temperament.map(async (temp) => {
        const temper = await Temperament.findOne({ where: { name: temp } });
        await newDog.addTemperament(temper);
    });

    const returnedTemps = temperament.join(', ');
    return {
        weight: weight,
        height: height,
        name: nameCased,
        lifespan: lifespan,
        image: image,
        temperament: returnedTemps,
        id: newDog.dataValues.id,
        created: true,
    };
}