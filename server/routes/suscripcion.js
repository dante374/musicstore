const express = require('express');
const router = express.Router();
const pool = require('../db/conexion');

router.post('/suscripcion', async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({error:'El email es requerido'});
    }

    if (!/\S+@\S+\.\S+/.test(email)){
        return res.status(400).json({error: 'El email no es valido'});
    }

    try{
        const existe = await pool.query('SELECT id FROM suscriptores WHERE email = $1', [email]);
        if(existe.rows.length>0){
            return res.status(400).json({error: 'Este email ya esta suscripto'})
        }
        
        await pool.query('INSERT INTO suscriptores (email) VALUES ($1)', [email]);
        res.json({mensaje: '¡Te suscribiste correctamente!'})
    }catch(error){
         console.error('Error completo:', error)
        res.status(500).json({ error: 'Error al procesar la suscripción' });
    }
})


module.exports = router;