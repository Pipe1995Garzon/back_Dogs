const listMyspetsModel = require('../models/mascotas_Model');
const multer = require('multer');
const path = require('path');
const fs = require('fs')



const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images_pets/custody_pets'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-Dogs-' + file.originalname)
    }
})

const fileUploadpetImage = multer({
    storage: diskstorage
}).single('image')




//listar mascotas en custodia
async function listarMacotasenCustodia(req, res) {
    const result_Mypets = await listMyspetsModel().listPets();
    res.status(200).json(result_Mypets);
}

//registrar mascotas en custodia
async function CrearMascotaenCustodia(req, res) {
    const data = req.body;
    console.log(req.body);
    await listMyspetsModel().crearMascotaenCustodia(data);
    res.status(200).json({
        success: 1,
        message: "agregado con exito"
    })
}

//modificar mascotas en custodia
async function ModificarMascotaenCustodia(req, res) {
    const data = [
        req.body.nombre,
        //req.body.foto,
        req.body.edad,
        req.body.descripcion,
        req.body.id_raza,
        req.body.id_vacuna,
        req.body.id_estado,
        req.params.id
    ]
    await listMyspetsModel().modificarMascotaenCustodia(data);
    res.status(200).json({
        success: 1,
        message: "editado con exito con exito"
    })
}

//eliminar mascotas en custodia
async function EliminarMacotasenCustodia(req, res) {
    const data = req.params.id;
    await listMyspetsModel().eliminarMascotaenCustodia(data);
    res.status(200).json({
        success: 1,
        message: "eliminado con exito con exito"
    })
}

//SECCION HISTORIA DE MASCOTAS - SECCION HISTORIA DE MASCOTAS - SECCION HISTORIA DE MASCOTAS - SECCION HISTORIAS DE MASCOTAS
//listar historia de mascotas
async function listarHistoriasMascotas(req, res) {
    const result_Mypets = await listMyspetsModel().listHistoryPets();
    res.status(200).json(result_Mypets);
}

//registrar historias de mascotas
async function RegistrarHistoriaMascotas(req, res) {
    const data = req.body;
    console.log(req.body);
    await listMyspetsModel().createHistoryPets(data);
    res.status(200).json({
        success: 1,
        message: "agregado con exito"
    })
}

//modificar mascotas en custodia
async function ModificarHistoriaMascotas(req, res) {
    const data = [
        req.body.nombre,
        //req.body.foto,
        req.body.descripcion,
        req.body.id_raza,
        req.body.usuario,
        req.params.id
    ]
    await listMyspetsModel().updateHistoryPets(data);
    res.status(200).json({
        success: 1,
        message: "editado con exito con exito"
    })
}

//eliminar mascotas en custodia
async function EliminarHistoriaMascotas(req, res) {
    const data = req.params.id;
    await listMyspetsModel().deleteHistoryPets(data);
    res.status(200).json({
        success: 1,
        message: "eliminado con exito con exito"
    })
}

//LISTAS PUBLICAS DE LAS MASCOTAS LO QUE LA GENTE VA A VER SIN NECESIDAD DE LOGUEO. 
//TAMBIEN  ES LA MISMA INFORMACION QUE VA A MOSTRAR LA APP.
async function PublicListPets(req, res) {
    const pets = await listMyspetsModel().publicpetslist();
    res.status(200).json(pets);
}
//HISTORIAS PUBLICAS DE LAS MASCOTAS LO QUE LA GENTE VA A VER SIN NECESIDAD DE LOGUEO. 
//TAMBIEN  ES LA MISMA INFORMACION QUE VA A MOSTRAR LA APP.
async function PublicHistory(req, res) {
    const history = await listMyspetsModel().publicpetshistory();
    res.status(200).json(history);
}
//LISTAR RAZA DE MASCOTAS
async function ListarRazaMascotas(req, res) {
    const raza = await listMyspetsModel().listbreed();
    res.status(200).json(raza);
}
//LISTAR ESTADO DE MASCOTA
async function ListarEstadoDeMascota(req, res) {
    const estado = await listMyspetsModel().statepet();
    res.status(200).json(estado)
}
//ESTADO DE VACUNA
async function ListarEstadoDeVacuna(req, res) {
    const vacuna = await listMyspetsModel().vaccinestate();
    res.status(200).json(vacuna)
}


//LOGICA GESTION MASCOTAS
//MOSTRAR HISTORIAS INDIVIDUALES
async function MostrarHistoriaIndividual(req, res) {
    const data = req.params.id;
    const historia = await listMyspetsModel().mostrarhistoriaindividual(data);
    res.status(200).json(historia)
}



module.exports = {
    listarMacotasenCustodia,
    CrearMascotaenCustodia,
    EliminarMacotasenCustodia,
    ModificarMascotaenCustodia,
    fileUploadpetImage,
    listarHistoriasMascotas,
    RegistrarHistoriaMascotas,
    ModificarHistoriaMascotas,
    EliminarHistoriaMascotas,
    PublicListPets,
    PublicHistory,
    ListarRazaMascotas,
    ListarEstadoDeMascota,
    ListarEstadoDeVacuna,
    MostrarHistoriaIndividual
}