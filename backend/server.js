require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // <--- 1. AGGIUNGI QUESTO IN ALTO

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// 1. Specifica la cartella dei file statici puntando al frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Inizializza la connessione a Google (lascialo com'è)
require('./config/googleAuth');

// Route di test (lascialo com'è)
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend di Extrosa Beauty operativo! 🚀' });
});

// 2. MODIFICA QUESTO: Esce da backend ('..') ed entra in frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Importa e usa le rotte delle prenotazioni
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/prenotazioni', bookingRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato con successo sulla porta ${PORT}`);
});