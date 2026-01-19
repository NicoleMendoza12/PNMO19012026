const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mi_clave_secreta_super_segura_2026';


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor proporciona username, email y password'
            });
        }

       
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El usuario o email ya está registrado'
            });
        }

        
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor proporciona email y password'
            });
        }

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        
        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username,
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};