// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.

const axios = require('axios');
const { Dog } = require('../db/db.js')

const URL = 'https://api.thedogapi.com/v1/breeds';

module.exports = async (req, res) => {
    const { idRaza } = req.params;
    try {
        // Traigo todas las razas
        let response = await axios(URL);

        // Extraigo la que piden
        let requested = response.data.find(raza => raza.id === Number(idRaza));

        // Si no está en la API, busca en la database
        if (!requested) {
            response = await Dog.findOne({ where: { id: idRaza } });
        }
        res.status(200).json(requested);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "El id ingresado no existe" });
    }
}