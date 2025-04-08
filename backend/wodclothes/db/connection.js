const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'wodclothes';

let db;

async function conectarDB() {
  try {
    const client = await MongoClient.connect(mongoURL);
    console.log('Conexión a MongoDB exitosa');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

function obtenerDB() {
  if (!db) {
    throw new Error('La conexión a la base de datos no está establecida');
  }
  return db;
}

module.exports = { conectarDB, obtenerDB };