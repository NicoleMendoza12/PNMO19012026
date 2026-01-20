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
        success: true,
        message: 'API PNMO19012026 - Sistema de Gestión de Clientes',
        version: '1.0.0'
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'La ruta solicitada no existe'
    });
});


app.listen(PORT, () => {
    console.log(`\n🚀 Servidor listo en: http://localhost:${PORT}`);
    console.log(`📂 Rutas de autenticación: http://localhost:${PORT}/api/auth`);
    console.log(`📂 Rutas de clientes: http://localhost:${PORT}/api/clients\n`);
});