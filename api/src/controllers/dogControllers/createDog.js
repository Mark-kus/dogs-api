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
        const searchTemp = temp.trim();
        const temper = await Temperament.findOne({ where: { name: searchTemp } });
        newDog.addTemperament(temper);
    })

    return {
        weigth: newDog.weigth,
        heigth: newDog.heigth,
        lifespan: newDog.lifespan,
        name: newDog.name,
        id: newDog.id,
    };
}