const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mi_clave_secreta_super_segura_2026'; 

const authMiddleware = (req, res, next) => {
    try {
        
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Acceso denegado. No se proporcionó token de autenticación' 
            });
        }

        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            message: 'Token inválido o expirado' 
        });
    }
};

module.exports = authMiddleware;