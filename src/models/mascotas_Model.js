const pool = require('../database');

module.exports = function() {
    //listar mascotas
    async function listPets() {
        let sql = "select * from dogs";
        return await pool.query(sql);
    }


    //registrar mascotas
    async function crearMascotaenCustodia(data) {
        let sql = "insert into dogs set ?";
        return await pool.query(sql, data);
    }

    //modificar mascotas
    async function modificarMascotaenCustodia(data) {
        console.log(data)
        let sql = `update dogs set nombre=?, edad=?,
        descripcion=?, id_raza=?, id_vacuna=?, id_estado=?
        where id_dog = ?`;
        return await pool.query(sql, data)
    }
    //eliminar mascotas 
    async function eliminarMascotaenCustodia(data) {
        let sql = "delete from dogs where id_dog = ?"
        return await pool.query(sql, data)
    }

    //SECCION DE HISTORIA DE MASCOTAS - SECCION DE HISTORIA DE MASCOTAS - SECCION DE HISTORIA DE MASCOTAS

    //listar historia de mascotas 
    async function listHistoryPets() {
        let sql = "select * from historia";
        return await pool.query(sql);
    }

    //registrar mascotas
    async function createHistoryPets(data) {
        let sql = "insert into historia set ?";
        return await pool.query(sql, data);
    }

    //modificar historia mascotas sin foto
    async function updateHistoryPets(data) {
        console.log(data)
        let sql = `update historia set nombre=?, 
        descripcion=?, id_raza=?, usuario=? where id_historia = ?`;
        return await pool.query(sql, data)
    }

    //eliminar mascotas 
    async function deleteHistoryPets(data) {
        let sql = "delete from historia where id_historia = ?"
        return await pool.query(sql, data)
    }

    //LISTA PUBLICA DE MASCOTAS (SE MUESTRA AL PUBLICO SIN NECESIDAD DE LOGUEARSE........!!!!!!!!)
    //TAMBIEN ESTA ES LA INFORMACION QUE VA A MOSTRAR LA APP.
    async function publicpetslist() {
        let sql = `SELECT dog.id_dog, dog.nombre,dog.foto,dog.edad,dog.descripcion,dog.usuario,dog.numero_contacto, ra.raza, va.vacuna, es.estado FROM dogs dog, raza ra, vacuna va, estado es
        WHERE dog.id_raza=ra.id_raza AND dog.id_vacuna=va.id_vacuna AND dog.id_estado=es.id_estado`;
        return await pool.query(sql);
    }

    //HISTORIAS PUBLICA DE MASCOTAS (SE MUESTRA AL PUBLICO SIN NECESIDAD DE LOGUEARSE........!!!!!!!!)
    //TAMBIEN ESTA ES LA INFORMACION QUE VA A MOSTRAR LA APP.
    async function publicpetshistory() {
        let sql = `SELECT hi.nombre,hi.foto,hi.descripcion,hi.usuario, ra.raza FROM historia hi, raza ra
        WHERE hi.id_raza=ra.id_raza`;
        return await pool.query(sql)
    }
    //LISTAR RAZA DE MASCOTAS
    async function listbreed() {
        let sql = 'select * from raza';
        return await pool.query(sql);
    }
    //LISTAR ESTADO DE LA MASCOTA
    async function statepet() {
        let sql = 'select * from estado';
        return await pool.query(sql);
    }
    //LISTAR ESTADO DE VACUNA
    async function vaccinestate() {
        let sql = 'select * from vacuna';
        return await pool.query(sql);
    }

    //LOGICA GESTION HISTORIAS
    async function mostrarhistoriaindividual(data) {
        console.log(data)
        let sql = 'SELECT nombre FROM historia WHERE usuario =?';
        return await pool.query(sql, data);
    }

    return {
        listPets,
        crearMascotaenCustodia,
        modificarMascotaenCustodia,
        eliminarMascotaenCustodia,
        listHistoryPets,
        createHistoryPets,
        updateHistoryPets,
        deleteHistoryPets,
        publicpetslist,
        publicpetshistory,
        listbreed,
        statepet,
        vaccinestate,
        mostrarhistoriaindividual
    }
}