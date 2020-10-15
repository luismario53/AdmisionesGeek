const UsuarioDAO = require("../persistence/dao/Usuario.dao");
// const logger = require("../../utils/logger");

module.exports.save = async function (request, response) {
    const usuario = request.body;
    try {
        const result = await UsuarioDAO.save(usuario);
        response.status(200).json(result);
        // logger.info(`Se creo el usuario ${result.nombre}`);
    } catch (error) {
        response.status(500).json("Error creando al usuario");
        // logger.error(`Error creando al usuario`);
    }
}

module.exports.get = async function (request, response) {
    try {
        const result = await UsuarioDAO.get();
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json("No se encontraron usuarios");
    }
}

module.exports.getByRol = async function (request, response) {
    const id = request.params["rol"];
    try {
        const result = await UsuarioDAO.getByRol(rol);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json("No se encontró al usuarios");
    }
}

module.exports.update = async function (request, response) {
    const id = request.params["id"];
    const nuevo = request.body;
    try {
        const viejo = await UsuarioDAO.getById(id);
        const result = await UsuarioDAO.update(viejo, nuevo);
        response.status(200).json(result);
        // logger.info(`Se actualizo al usuario con id: ${id}`);
    } catch (error) {
        response.status(500).json("No se pudo actualizar al usuario");
        // logger.error(`No se pudo actualizar al usuario con id: ${id} o no existe`);
    }
}

module.exports.delete = async function (request, response) {
    const id = request.params["id"];
    try {
        const result = await UsuarioDAO.delete(id);
        response.status(200).json(result);
        // logger.info(`Se elimino al usuario con id: ${id}`);
    } catch (error) {
        response.status(500).json("No se pudo eliminar al usuario");
        // logger.error(`No se pudo eliminar al usuario`);
    }
}

module.exports.login = async function (request, response) {
    const correo = request.body.correo;
    const password = request.body.password;
    try {
        const result = await UsuarioDAO.login(correo, password);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json("Error al iniciar sesion");
    }
}