const listMyspetsModel = require('../models/mascotas_Model');

//listar mascotas en custodia
async function listarMacotasenCustodia(req, res) {
    const result_Mypets = await listMyspetsModel().listPets();
    res.status(200).json({ result_Mypets });
}

//registrar mascotas en custodia
async function CrearMascotaenCustodia(req, res) {
    const data = req.body;
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
        req.body.foto,
        req.body.edad,
        req.body.historia,
        req.body.id_raza,
        req.body.id_vacuna,
        req.body.id_estado_dog,
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

module.exports = {
    listarMacotasenCustodia,
    CrearMascotaenCustodia,
    EliminarMacotasenCustodia,
    ModificarMascotaenCustodia
}