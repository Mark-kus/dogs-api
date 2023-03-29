const axios = require("axios");
const { Dog } = require('../db/db.js');

const URL = 'https://api.thedogapi.com/v1/breeds/search?q=';

// (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

module.exports = async (req, res) => {
    // Extraigo el nombre de la raza que me piden
    const { q } = req.query;

    try {
        // Busco la raza que me piden en la API
        let response = await axios(URL + q);

        // Si no la encontró, la busco en la db
        if (!response) response = await Dog.findOne({ where: { name: q } });
        res.status(200).json(response.data);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "La raza ingresada no existe" });
    }
}