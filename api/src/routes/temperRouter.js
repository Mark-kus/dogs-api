const { Router } = require('express');

// Traigo los controladores
const getAllTemps = require('../handlers/temperaments/getAllTemps');

const temperRouter = Router();

// Configuro el router '/temper'
temperRouter.get('/', getAllTemps);

module.exports = temperRouter;