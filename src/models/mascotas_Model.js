const pool = require('../database');

module.exports = function() {
    //listar mascotas en custodia
    async function listPets() {
        let sql = "select * from dog_custodia";
        return await pool.query(sql);
    }


    //registrar mascotas en custodia
    async function crearMascotaenCustodia(data) {
        let sql = "insert into dog_custodia set ?";
        return await pool.query(sql, data);
    }

    //modificar mascotas en custodia
    async function modificarMascotaenCustodia(data) {
        let sql = `update dog_custodia set nombre = ?,
                    foto=?, edad = ?, historia = ?, 
                    id_raza=? ,id_vacuna=?,id_estado_dog=? where id_dog_custodia=?`;
        return await pool.query(sql, data)
    }
    //eliminar mascotas en custodia
    async function eliminarMascotaenCustodia(data) {
        let sql = "delete from dog_custodia where id_dog_custodia = ?"
        return await pool.query(sql, data)
    }

    return {
        listPets,
        crearMascotaenCustodia,
        modificarMascotaenCustodia,
        eliminarMascotaenCustodia
    }
}