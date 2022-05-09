const express = require('express');
const router = express.Router();
const mascotasController = require('../../controllers/mascotasController');
const fs = require('fs');
const path = require('path');
const listMyspetsModel = require('../../models/mascotas_Model');
const multer = require('multer');


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



//imagen historia mascota. desde el formulario de editar.

router.put('/subirimagenmascota/:id', mascotasController.fileUpload, async(req, res) => {
    const type = req.file.mimetype;
    const name = req.file.originalname;
    const data = fs.readFileSync(path.join(__dirname, '../../images_pets/' + req.file.filename))
    const fotos = [type, name, data, req.params.id]
    await listMyspetsModel().guardarimagenmascota(fotos);
    console.log('listo la parte de subir al servidor');
    let iddelaimagen = 0;
    const result_Mypets = await listMyspetsModel().listHistoryPets();
    result_Mypets.map(img => {
        fs.writeFileSync(path.join(__dirname, '../../Dogs_imagenes_h/' + iddelaimagen + 'Dogs.jpeg'), img.data)
    })

    const imagenes_guardadas = fs.readdirSync(path.join(__dirname, '../../Dogs_imagenes_h/'))
    console.log('lista la parte de imagenes que react va a consumir')
    console.log(imagenes_guardadas)
    imagenes_guardadas.toString();
    const nombrefoto = [imagenes_guardadas, req.params.id]
    await listMyspetsModel().foto(nombrefoto)
    console.log('si llego aqui deberia estar el nombre de la foto en la base de datos.....')
});


module.exports = router;
//