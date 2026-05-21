const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/conexion');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/registro', async (req, res) =>{
    const { nombre, email, password } = req.body;
    console.log({ nombre, email, password }) // ← agregá esto

    if(!nombre || !email || !password){
        return res.status(400).json({error: 'Todos los campos son requeridos' });
    }

    try{
        const existe = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        if(existe.rows.length > 0){
            return res.status(400).json({error: 'El email ya esta registrado'});
        }

        const hash = await bcrypt.hash(password, 10);

        const result = await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol', [nombre, email, hash]);

        const usuario = result.rows[0];
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, rol: usuario.rol},
            JWT_SECRET,
            { expiresIn: '7d'}
        );
        res.json({ token, usuario})
    }catch (error) {
       console.error('Error completo:', error) 
        res.status(500).json({ error: 'Error al registrar usuario'})
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const usuario = result.rows[0];
        const coincide = await bcrypt.compare(password, usuario.password);

        if (!coincide) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
        });

    } catch (error) {
        console.error('Error completo:', error)
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;