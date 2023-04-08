const { Router } = require('express');

// Traigo los middlewares
const validate = require('../middlewares/validate');

// Traigo los controladores
const getAllDogs = require('../handlers/dogs/getAllDogs');
const getDogId = require('../handlers/dogs/getDogId');
const getDogName = require('../handlers/dogs/getDogName');
const createDog = require('../handlers/dogs/createDog');

const dogRouter = Router();

// Configuro el router '/dogs'
dogRouter.get('/', getAllDogs);
dogRouter.get('/name', getDogName);
dogRouter.get('/:id', getDogId);
dogRouter.post('/', validate, createDog);

module.exports = dogRouter;