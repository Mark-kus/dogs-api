const axios = require("axios");
const { Dog } = require('../db/db.js');

const URLByName = 'https://api.thedogapi.com/v1/breeds/search?q=';
const URLAll = 'https://api.thedogapi.com/v1/breeds';

// (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

module.exports = async (req, res) => {
    // Extraigo el nombre de la raza que me piden
    const { q } = req.query;
    try {
        let response;
        if (q) {
            // Busco la raza que me piden en la API
            response = await axios(URLByName + q);

            // Si no la encontró, la busco en la db
            if (!response) response = await Dog.findAll({ where: { name: q } });
        }
        else {
            // Al no pasar un nombre, se buscan todos los perros
            response = await axios(URLAll);
        }
        res.status(200).json(response.data);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "La raza ingresada no existe" });
    }
}