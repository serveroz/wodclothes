const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./db/connection');
const productosRouter = require('./routes/product');
const categoriesRouter = require('./routes/category');

const app = express();
const PORT = 3001;

// Enable CORS for frontend requests
app.use(cors());

// Middleware para analizar solicitudes JSON
app.use(express.json());

conectarDB();

// API routes with proper prefixes
app.use('/api/products', productosRouter);
app.use('/api/categories', categoriesRouter);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});