const { Router } = require('express');

// Traigo los controladores
const getAllBreeds = require('../handlers/getAllBreeds');
const getBreedId = require('../handlers/getBreedId.js');
const getBreedName = require('../handlers/getBreedName');
const createDog = require('../handlers/createDog');

const dogRouter = Router();

// Configuro el router '/dogs'
dogRouter.get('/', getAllBreeds);
dogRouter.get('/name', getBreedName);
dogRouter.get('/:idRaza', getBreedId);
dogRouter.post('/', createDog);

module.exports = dogRouter;