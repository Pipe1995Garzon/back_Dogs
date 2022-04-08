const express = require('express');
const router = express.Router();
const mascotasController = require('../../controllers/mascotasController');


//listar mascotas
router.get('/lista_mascotas/', mascotasController.listarMacotasenCustodia);
//registrar mascotas
router.post('/resgitrar_mascotas', mascotasController.CrearMascotaenCustodia);
//eliminar mascotas
router.delete('/eliminar_mascotas/:id', mascotasController.EliminarMacotasenCustodia);
//modificar mascotas
router.put('/modificar_mascotas/:id', mascotasController.ModificarMascotaenCustodia);

module.exports = router;