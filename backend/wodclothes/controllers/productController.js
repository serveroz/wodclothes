const { obtenerDB } = require('../db/connection');

const obtenerProductos = async (req, res) => {
  try {
    const db = obtenerDB();
    const productos = await db.collection('product').find().toArray();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error });
  }
};

const crearProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const nuevoProducto = req.body;
    await db.collection('product').insertOne(nuevoProducto);
    res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el producto', error });
  }
};

module.exports = { obtenerProductos, crearProducto };
