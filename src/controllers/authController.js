const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const login = async (req, res) => {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        const user = result.rows[0];

        const isValid = await bcrypt.compare(password_hash, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = { login };