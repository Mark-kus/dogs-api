const { Router } = require('express');

// Traigo los controladores
const getAllTemps = require('../controllers/getAllTemps');

const temperRouter = Router();

// Configuro el router '/temper'
temperRouter.get('/', getAllTemps);