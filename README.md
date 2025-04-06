# WODClothes

**Ecommerce para Tienda de Ropa Deportiva Femenina**

---

### 1. **Objetivo del MVP**

Validar la viabilidad de una app web como ecommerce especializado en ropa deportiva femenina, permitiendo a los usuarios explorar productos, agregarlos al carrito y realizar compras.

---

### 2. **Preguntas Clave Iniciales**

### Negocio:

- ¿Cuál es el público objetivo
    - Población femenina que realiza alguna actividad deportiva, sin importar su edad.
- ¿Qué tipo de ropa deportiva se venderá (fitness, running, yoga, deportes de equipo, etc)?
    - Se venderá ropa deportiva tipo fitness.
- ¿Cuáles son los diferenciales frente a la competencia?
    - Calidad en la tela y su comodidad, precios competitivos y una atención personalizada son nuestras propuestas de valor.
- ¿Cuáles son los objetivos a corto y mediano plazo?
    - Dar a conocer la marca y la tienda
    - Inicio de ventas
    - Recibir feedback por parte de los early adopters
    - Tener versiones tanto móvil como web
- ¿Habrá stock propio o dropshipping?
    - Se tendrá stock propio

### Producto:

- ¿Cuáles son las categorías de productos principales?
    - Shorts
    - Leggins
    - Bikers
    - Conjuntos deportivos
    - Enterizos
    - Tops
- ¿Cuántos productos por categoría se mostrarán inicialmente?
    - 5 productos por categoría
- ¿Qué información debe tener cada producto (nombre, precio, tallas, colores, descripción, etc)?
    - Producto
        - id
        - nombre producto
        - descripcion
        - idcategoria
        - stock
        - tallas disponibles
        - colores disponibles
        - imagen
        - precio unitario
    - Categoria
        - id
        - nombre categoria
        - imagen
    - Usuario
        - id
        - nombre completo
        - username
        - password
        - email
    - Carrito
        - id
        - idproducto
        - idusuario
        - cantidad
        - subtotal
        - total

### Tecnología / Stack Tecnológico:

- Frontend
    - React
- Backend
    - Node js
- Base de datos
    - MongoDB

---

### 3. **Funcionalidades Principales del MVP**

- Landing page con branding
- Catálogo de productos
- Búsqueda y filtrado por categoría, talla, precio, etc.
- Página de detalle del producto
- Carrito de compras
- Registro e inicio de sesión

---

### 4. **Arquitectura Inicial**

- **Frontend:** React Native
- **Backend/API:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** Auth0
- **Despliegue:** Vercel (frontend), Render (backend)