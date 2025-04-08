const express = require('express');
const router = express.Router();
const { obtenerProductos, crearProducto } = require('../controllers/productController');

// Ruta para producto
router.get('/getAll', obtenerProductos);
router.post('/create', crearProducto);

module.exports = router;
