const { obtenerDB } = require('../db/connection');

const obtenerCategorias = async (req, res) => {
  try {
    const db = obtenerDB();
    const categorias = await db.collection('category').find().toArray();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las categorias', error });
  }
};

module.exports = { obtenerCategorias };
