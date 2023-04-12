const { Router } = require('express');

// Traigo los middlewares
const validate = require('../middlewares/validate');

// Traigo los controladores
const getAllDogs = require('../handlers/dogs/getAllDogs');
const getDogId = require('../handlers/dogs/getDogId');
const getDogName = require('../handlers/dogs/getDogName');
const createDog = require('../handlers/dogs/createDog');
const deleteDog = require('../handlers/dogs/deleteDog');

const dogRouter = Router();

// Configuro el router '/dogs'
dogRouter.get('/', getAllDogs);
dogRouter.get('/name', getDogName);
dogRouter.get('/:id', getDogId);
dogRouter.post('/', validate, createDog);
dogRouter.delete('/:id', deleteDog);

module.exports = dogRouter;