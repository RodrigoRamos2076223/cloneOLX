const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

function autenticarJWT(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = {
    autenticarJWT
}; 