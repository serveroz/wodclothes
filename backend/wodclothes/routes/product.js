const express = require('express');
const router = express.Router();
const { obtenerProductos, crearProducto, obtenerProductoid, actualizarProducto, eliminarProducto } = require('../controllers/productController');

// Ruta para producto
router.get('/getAll', obtenerProductos);
router.post('/create', crearProducto);
router.get('/:id', obtenerProductoid);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
