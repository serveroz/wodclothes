const express = require('express');
const { conectarDB } = require('./db/connection');
const productosRouter = require('./routes/product');
const categoriesRouter = require('./routes/category');

const app = express();
const PORT = 3000;

// Middleware para analizar solicitudes JSON
app.use(express.json());

conectarDB();

app.use('/product', productosRouter);
app.use('/category', categoriesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
});