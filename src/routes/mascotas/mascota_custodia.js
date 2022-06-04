const express = require('express');
const router = express.Router();
const mascotasController = require('../../controllers/mascotasController');
const fs = require('fs');
const path = require('path');
const listMyspetsModel = require('../../models/mascotas_Model');
const multer = require('multer');


//LISTAR RAZA PARA FORMULARIOS
router.get('/listarrazamascotas', mascotasController.ListarRazaMascotas);
//LISTAR ESTADO PARA FORMULARIOS
router.get('/estadomascotas', mascotasController.ListarEstadoDeMascota);
//LISTAR ESTADO DE VACUNA VACUNA PARA FORMULARIOS
router.get('/estadovacuna', mascotasController.ListarEstadoDeVacuna);

//SECCION MASCOTAS A PUBLICAR ----- SECCION MASCOTAS A PUBLICAR------------
//listar mascotas para posible adopcion
router.get('/lista_mascotas/', mascotasController.listarMacotasenCustodia);
//registrar mascotas para posible adopcion
router.post('/resgitrar_mascotas', mascotasController.CrearMascotaenCustodia);
//eliminar mascotas para posible adopcion
router.delete('/eliminar_mascotas/:id', mascotasController.EliminarMacotasenCustodia);
//modificar mascotas para posible adopcion
router.put('/modificar_mascotas/:id', mascotasController.ModificarMascotaenCustodia);

//SECCION HISTORIAS DE MASCOTAS------SECCION HISTORIAS DE MASCOTAS-------- SECCION HISTORIAS DE MASCOTAS
//listar historias de mascotas
router.get('/historias', mascotasController.listarHistoriasMascotas);
//resgistrar historias
router.post('/resgitrar_historia', mascotasController.RegistrarHistoriaMascotas);
//modificar historia
router.put('/modificar_historia/:id', mascotasController.ModificarHistoriaMascotas);
//eliminar mascotas hhistoria
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
    let iddelaimagen = Math.floor(Math.random() * 1000);
    const result_Mypets = await listMyspetsModel().listHistoryPets();
    result_Mypets.map(img => {
            fs.writeFileSync(path.join(__dirname, '../../Dogs_imagenes_h/' + iddelaimagen + 'Dogs.jpeg'), img.data)
        })
        //const imagenes_guardadas = fs.readdirSync(path.join(__dirname, '../../Dogs_imagenes_h/'))
    const imagenes_guardadas = fs.readFileSync(path.join(__dirname, '../../Dogs_imagenes_h/' + iddelaimagen + 'Dogs.jpeg'))
    console.log('lista la parte de imagenes que react va a consumir')
        //console.log(imagenes_guardadas)
    imagenes_guardadas.toString();
    const nom_foto = `${iddelaimagen}Dogs.jpeg`;
    const nombrefoto = [nom_foto, req.params.id]
    await listMyspetsModel().foto(nombrefoto)
    console.log('si llego aqui deberia estar el nombre de la foto en la base de datos.....')
});


//subir imagen para mascotas para adoptar.
router.put('/subirimagenmascotadogs/:id', mascotasController.fileUploaddogs, async(req, res) => {
    const type = req.file.mimetype;
    const name = req.file.originalname;
    console.log(req.file);
    const data = fs.readFileSync(path.join(__dirname, '../../images_pets/' + req.file.filename))
    const fotos = [type, name, data, req.params.id]
    const id = req.params.id
    await listMyspetsModel().guardarimagenmascotadogs(fotos);
    console.log('listo la parte de subir al servidor');
    let iddelaimagen = Math.floor(Math.random() * 10000);
    const result_MypetsDogs = await listMyspetsModel().listHistoryPetsDogs(id);
    console.log('holis', result_MypetsDogs)
    result_MypetsDogs.map(img => {
            fs.writeFileSync(path.join(__dirname, '../../Dogs_imagenes_h/' + iddelaimagen + 'Dogs.jpeg'), img.data)
        })
        //const imagenes_guardadas = fs.readdirSync(path.join(__dirname, '../../Dogs_imagenes_h/'))
    const imagenes_guardadas = fs.readFileSync(path.join(__dirname, '../../Dogs_imagenes_h/' + iddelaimagen + 'Dogs.jpeg'))
    console.log('lista la parte de imagenes que react va a consumir')
        //console.log(imagenes_guardadas)
        //aqui voy
    imagenes_guardadas.toString();
    const nom_foto = `${iddelaimagen}Dogs.jpeg`;
    const nombrefoto = [nom_foto, req.params.id]
    await listMyspetsModel().fotodogs(nombrefoto)
    console.log('si llego aqui deberia estar el nombre de la foto en la base de datos.....')
});

module.exports = router;
//