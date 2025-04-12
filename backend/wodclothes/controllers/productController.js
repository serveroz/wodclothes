const { obtenerDB } = require('../db/connection');
const { ObjectId } = require('mongodb');


const obtenerProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const db = obtenerDB();
    
    // Ensure we have a valid database connection
    if (!db) {
      throw new Error('Database connection not available');
    }

    // Get products and total count
    const [productos, total] = await Promise.all([
      db.collection('product')
        .find()
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection('product').countDocuments()
    ]);

    // Ensure productos is always an array
    const safeProductos = Array.isArray(productos) ? productos : [];
    
    res.status(200).json({
      products: safeProductos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      hasMore: skip + safeProductos.length < total
    });
  } catch (error) {
    console.error('Error in obtenerProductos:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener los productos', 
      error: error.message,
      products: [] // Always include products array even in error case
    });
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
