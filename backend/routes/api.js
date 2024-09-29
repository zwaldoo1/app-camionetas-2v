// routes/api.js
const express = require('express');
const router = express.Router();
const Camioneta = require('../models/camioneta'); // Asegúrate de que este modelo exista

// Ruta para obtener las camionetas disponibles
router.get('/camionetas', async (req, res) => {
  try {
    const camionetas = await Camioneta.find({ disponible: true });
    res.json(camionetas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las camionetas' });
  }
});

// Aquí puedes agregar más rutas

module.exports = router;
