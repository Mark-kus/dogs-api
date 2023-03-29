const { Router } = require('express');

// Traigo los controladores
const getAllBreeds = require('../controllers/getAllBreeds');
const getBreedId = require('../controllers/getBreedId.js');
const getBreedName = require('../controllers/getBreedName');
const createDog = require('../controllers/createDog');

const dogRouter = Router();

// Configuro el router '/dogs'
dogRouter.get('/', getAllBreeds);
dogRouter.get('/name', getBreedName);
dogRouter.get('/:idRaza', getBreedId);
dogRouter.post('/', createDog);

module.exports = dogRouter;