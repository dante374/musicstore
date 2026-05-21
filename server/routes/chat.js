const express = require('express');
const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const systemPrompt = `
Sos el asistente virtual de MusicStore, una tienda de instrumentos musicales.
Tu rol es ayudar a los clientes a encontrar el instrumento ideal.

Nuestro catálogo actual:
- Guitarra Fender Stratocaster - $450.000 - Categoría: Guitarras
- Guitarra Gibson Les Paul - $620.000 - Categoría: Guitarras
- Guitarra Gibson SG Standard - $720.000 - Categoría: Guitarras
- Guitarra Epiphone Les Paul Standard - $280.000 - Categoría: Guitarras
- Guitarra Acústica Yamaha F310 - $120.000 - Categoría: Guitarras
- Bajo Fender Jazz Bass - $380.000 - Categoría: Bajos
- Bajo Ibanez GSR200 - $210.000 - Categoría: Bajos
- Bajo Gibson SG Bass - $560.000 - Categoría: Bajos
- Teclado Yamaha P-145 - $290.000 - Categoría: Teclados
- Teclado Roland FP-30X - $420.000 - Categoría: Teclados
- Teclado Casio CT-S300 - $85.000 - Categoría: Teclados
- Teclado Korg B2 - $380.000 - Categoría: Teclados
- Batería Pearl Export - $750.000 - Categoría: Baterías
- Batería Pearl Roadshow - $480.000 - Categoría: Baterías
- Batería Tama Imperialstar - $620.000 - Categoría: Baterías
- Micrófono Shure SM58 - $95.000 - Categoría: Micrófonos
- Micrófono Audio-Technica AT2020 - $145.000 - Categoría: Micrófonos
- Micrófono Rode NT1 - $280.000 - Categoría: Micrófonos

Reglas:
- Respondé siempre en español
- Sé amable y conciso
- Si te preguntan por un instrumento, recomendá opciones del catálogo
- Si te preguntan algo fuera del tema musical, redirigí la conversación amablemente
- No inventes productos que no están en el catálogo
`;


router.post('/chat', async (req, res) => {
    const {mensaje, historial} = req.body;

    if(!mensaje){
        return res.status(400).json({error: 'Mensaje requerido'})
    }

    const messages = [
        ...(historial || []),
        {role: 'user', content: mensaje}
    ];
    try{
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {role: 'system', content: systemPrompt},
                    ...messages
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        const data = await response.json();
        if(!response.ok){
            return res.status(500).json({error: data.error?.message || 'Error de groq'})
        }
        const respuesta = data.choices[0].message.content;
        res.json({respuesta});
    }catch(error){
        res.status(500).json({error: 'Error al conectar con groq'});
    }
})

module.exports = router;