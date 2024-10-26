const { Dog, Temperament } = require('../../db/db');
const cleanArrayAPI = require('../../helpers/cleanArrayAPI');
const axios = require('axios');
const cleanArrayDB = require('../../helpers/cleanArrayDB');

module.exports = async () => {
    // Busco los perros de la api
    const apiDogsRaw = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
    
    // Obtengo todas las URLs de las imágenes a la vez
    const imageRequests = apiDogsRaw.map(dog => 
        dog.reference_image_id ? axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`) : Promise.resolve({ data: { url: null } })
    );
    const imageResponses = await Promise.all(imageRequests);
    
    // Asigno las URLs a los perros
    apiDogsRaw.forEach((dog, index) => {
        dog.url = imageResponses[index].data.url;
    });

    const apiDogs = cleanArrayAPI(apiDogsRaw);
    
    // Busco los perros de la db
    const dbDogs = cleanArrayDB(await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ["name"]
        }]
    }));
    
    // Los unifico
    return [...apiDogs, ...dbDogs];
}