const pool = require('../database');

module.exports = function() {
    async function listPets() {
        let sql = "SELECT pe.cod_pedido, u.usuario, p.valor, p.nombre FROM pedidos pe, usuarios u, productos p WHERE u.id_usuario=pe.id_usuario AND  p.codigo_producto=pe.codigo_producto";
        return await pool.query(sql);
    }

    return {
        listPets
    }
}