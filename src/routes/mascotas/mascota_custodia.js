const express = require('express');
const router = express.Router();
const mascotasController = require('../../controllers/mascotasController');
const fs = require('fs');
const path = require('path');
const listMyspetsModel = require('../../models/mascotas_Model');


//LISTAR RAZA
router.get('/listarrazamascotas', mascotasController.ListarRazaMascotas);
//LISTAR ESTADO
router.get('/estadomascotas', mascotasController.ListarEstadoDeMascota);
//LISTAR ESTADO DE VACUNA
router.get('/estadovacuna', mascotasController.ListarEstadoDeVacuna);

//SECCION MASCOTAS A PUBLICAR ----- SECCION MASCOTAS A PUBLICAR------------
//listar mascotas
router.get('/lista_mascotas/', mascotasController.listarMacotasenCustodia);
//registrar mascotas
router.post('/resgitrar_mascotas', mascotasController.CrearMascotaenCustodia);
//eliminar mascotas
router.delete('/eliminar_mascotas/:id', mascotasController.EliminarMacotasenCustodia);
//modificar mascotas
router.put('/modificar_mascotas/:id', mascotasController.ModificarMascotaenCustodia);

//SECCION HISTORIAS DE MASCOTAS------SECCION HISTORIAS DE MASCOTAS-------- SECCION HISTORIAS DE MASCOTAS
//listar historias de mascotas
router.get('/historias', mascotasController.listarHistoriasMascotas);
//resgistrar historias
router.post('/resgitrar_historia', mascotasController.RegistrarHistoriaMascotas);
//modificar historia
router.put('/modificar_historia/:id', mascotasController.ModificarHistoriaMascotas);
//eliminar mascotas
router.delete('/eliminar_historia/:id', mascotasController.EliminarHistoriaMascotas);

//LISTAS PUBLICAS DE MASCOTAS 
router.get('/listapublicamascotas', mascotasController.PublicListPets);
//HISTORIAS PUBLICAS MASCOTAS
router.get('/historiaspublicasdemascotas', mascotasController.PublicHistory);


//LISTAS INDIVIDUALES MASCOTAS
router.get('/listaindividual/:usuario', mascotasController.MostrarHistoriaIndividual);
//LISTAS INDIVIDUALES DE MASCOTAS
router.get('/mascotasindividuales/:usuario', mascotasController.MostrarMascotaIndividual);
//subir imagen de mascota
router.post('/subirimagenmascota', mascotasController.fileUploadpetImage, async(req, res) => {
    const type = req.file.mimetype
    const name = req.file.originalname
    const data = fs.readFileSync(path.join((__dirname, '../../public/images_pets/custody_pets/' + req.file.filename)))
    const datas = [
        type,
        name,
        data
    ]
    await listMyspetsModel.guardarimagenmascota(datas)
    console.log('exito')
});

module.exports = router;
//