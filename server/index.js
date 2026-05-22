const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });
console.log('API KEY:', process.env.GROQ_API_KEY);
const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chat');
const contactoRoutes = require('./routes/contacto');
const suscripcionRoutes = require('./routes/suscripcion');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    oorigin: [
        'https://musicstore-1wrj.vercel.app',
        'https://musicstore-bf3t.vercel.app'
    ]
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', contactoRoutes);
app.use('/api', suscripcionRoutes);
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});