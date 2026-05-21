const express = require('express');
const router = express.Router();
const pool = require('../db/conexion');


router.post('/contacto', async (req, res) => {
    const {nombre, email, asunto, mensaje } = req.body;

    if(!nombre || !email || !asunto || !mensaje){
        return res.status(400).json({ error: 'Todos los campos son requeridos'});
    }

    try{
        await pool.query('INSERT INTO contactos (nombre, email, asunto, mensaje) VALUES ($1, $2, $3, $4)', [nombre, email, asunto, mensaje]);
        res.json({mensaje: 'Mensaje enviado correctamente'})
    }catch(error){
        console.error('Error completo', error)
        res.status(500).json({error: 'Error al enviar el mensaje'})
    }
})

module.exports = router;