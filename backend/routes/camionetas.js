const express = require('express');
const router = express.Router();
const Camioneta = require('../models/camioneta');
const Solicitud = require('../models/solicitud'); // Asegúrate de importar el modelo Solicitud

// Ruta para obtener las camionetas disponibles
router.get('/', async (req, res) => {
  try {
    const camionetas = await Camioneta.find({ disponible: true });
    res.json(camionetas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener camionetas' });
  }
});

// Ruta para reservar una camioneta
router.post('/reservar-camioneta/:id', async (req, res) => {
  try {
    const camioneta = await Camioneta.findById(req.params.id);
    if (camioneta.disponible) {
      camioneta.disponible = false;
      await camioneta.save();
      // Aquí puedes agregar la lógica para guardar la solicitud si es necesario
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Camioneta no disponible' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al reservar la camioneta' });
  }
});

// Ruta para devolver una camioneta
router.post('/devolver-camioneta/:id', async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    const camioneta = await Camioneta.findById(solicitud.camionetaId);
    camioneta.disponible = true;
    await camioneta.save();
    await solicitud.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al devolver la camioneta' });
  }
});

module.exports = router;
