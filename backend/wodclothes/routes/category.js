const express = require('express');
const router = express.Router();
const { obtenerCategorias } = require('../controllers/categoryController');


router.get('/getAll', obtenerCategorias);

module.exports = router;
