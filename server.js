const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const clientRoutes = require('./src/routes/ClientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'API PNMO19012026 - Sistema de Gestión de Clientes',
        version: '1.0.0',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login'
            },
            clients: {
                create: 'POST /api/clients',
                getAll: 'GET /api/clients',
                getById: 'GET /api/clients/:id',
                update: 'PUT /api/clients/:id',
                delete: 'DELETE /api/clients/:id'
            }
        }
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});


app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});