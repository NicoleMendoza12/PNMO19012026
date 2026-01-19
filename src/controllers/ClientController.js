const Client = require('../models/Client');


exports.createClient = async (req, res) => {
    try {
        const { nombres, apellidos, documento, correo, telefono, direccion } = req.body;

        
        if (!nombres || !apellidos || !documento || !correo || !telefono || !direccion) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            });
        }

        
        const client = new Client({
            nombres,
            apellidos,
            documento,
            correo,
            telefono,
            direccion
        });

        await client.save();

        res.status(201).json({
            success: true,
            message: 'Cliente creado exitosamente',
            data: client
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'El documento o correo ya está registrado'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear cliente',
            error: error.message
        });
    }
};


exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: clients.length,
            data: clients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener clientes',
            error: error.message
        });
    }
};


exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener cliente',
            error: error.message
        });
    }
};


exports.updateClient = async (req, res) => {
    try {
        const { nombres, apellidos, documento, correo, telefono, direccion } = req.body;

        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { nombres, apellidos, documento, correo, telefono, direccion },
            { new: true, runValidators: true }
        );

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cliente actualizado exitosamente',
            data: client
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'El documento o correo ya está registrado'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al actualizar cliente',
            error: error.message
        });
    }
};

/
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cliente eliminado exitosamente',
            data: client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar cliente',
            error: error.message
        });
    }
};