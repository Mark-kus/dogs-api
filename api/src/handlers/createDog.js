// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).
const { Dog } = require('../db/db.js');

module.exports = async (req, res) => {
    const { name, image, height, weight, lifespan } = req.body;

    if(![name, image, height, weight, lifespan].every(Boolean)) throw new TypeError('Faltan datos');

    try {
        const dog = await Dog.create({ name, image, height, weight, lifespan });
        res.status(200).json(dog);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}