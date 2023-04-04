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
        let response;
        // Se buscan las coincidencias en la API
        response = await axios(URL + q);

        // Se buscan las coincidencias en la DB


        // Si no hay coincidencias, se especifica
        // if (!response.data.length) response.data.push('No existe esa raza');
        
        res.status(200).json(response.data);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "Algo salío mal" });
    }
}