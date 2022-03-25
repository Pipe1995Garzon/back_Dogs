const express = require('express');
const router = express.Router();
const mascotasController = require('../../controllers/mascotasController');

//RUTAS PARA EL POSTMAN
router.get('/lista_mascotas/listarmascotas', mascotasController.listarMacotas);

module.exports = router;