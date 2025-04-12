const { obtenerDB } = require('../db/connection');
const { ObjectId } = require('mongodb');


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

const obtenerProductoid = async (req, res) => {
  try {
    const db = obtenerDB();
    const { id } = req.params;
    const producto = await db.collection('product').findOne({ _id: new ObjectId(id) });
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const { id } = req.params;
    const datosActualizados = req.body;
    const resultado = await db.collection('product').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: datosActualizados },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );
    if (resultado.matchedCount === 0) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Producto actualizado exitosamente', resultado });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el producto', error });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const db = obtenerDB();
    const { id } = req.params;
    const producto = await db.collection('product').deleteOne({ _id: new ObjectId(id) });
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Producto eliminado', producto });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error });
  }
};

module.exports = { obtenerProductos, crearProducto, obtenerProductoid, actualizarProducto, eliminarProducto };
