const listMyspetsModel = require('../models/mascotas_Model');

//listar todos los pedidos
async function listarMacotas(req, res) {
    const result_productos = await listMyspetsModel().listPets();
    res.status(200).json(result_Mypets);
}

module.exports = {
    listarMacotas
}