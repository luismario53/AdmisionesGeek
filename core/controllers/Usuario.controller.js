const UsuarioDAO = require("../persistence/dao/Usuario.dao");
// const logger = require("../../utils/logger");

module.exports.save = async (request, response) => {
    const usuario = request.body;
    try {
        const result = await UsuarioDAO.save(usuario);
        response.sendStatus(result);
    } catch (error) {
        response.sendStatus(500).json("Error creando al usuario");
    }
}

module.exports.get = async (request, response) => {
    const page = parseInt(request.params["page"]);
    try {
        let sizeResult = await UsuarioDAO.getSize();
        const usersResult = await UsuarioDAO.get(page);
        if (usersResult) {
            if (sizeResult > 0) {
                if (!Number.isInteger(sizeResult / 10)) {
                    sizeResult = parseInt(sizeResult / 10) + 1;
                } else {
                    sizeResult = parseInt(sizeResult / 10)
                }
            }
            const result = {
                size: sizeResult,
                users: usersResult
            }
            response.status(200).json(result);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.sendStatus(500);
    }
}

module.exports.getByRol = async (request, response) => {
    const rol = request.params["rol"];
    try {
        const result = await UsuarioDAO.getByRol(rol);
        if (result) {
            let lista = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].rol.rol.startsWith(rol)) {
                    lista.push(result[i]);
                }
            }
            response.status(200).json(lista);
        }
        // response.sendStatus(404);
    } catch (error) {
        response.sendStatus(500);
    }
}

module.exports.update = async (request, response) => {
    const id = request.params["id"];
    const nuevo = request.body;
    try {
        const viejo = await UsuarioDAO.getById(id);
        if (viejo) {
            const result = await UsuarioDAO.update(viejo, nuevo);
            response.sendStatus(result);
        } else {
            response.sendStatus(404);
        }

        // logger.info(`Se actualizo al usuario con id: ${id}`);
    } catch (error) {
        response.status(500).json("No se pudo actualizar al usuario");
        // logger.error(`No se pudo actualizar al usuario con id: ${id} o no existe`);
    }
}

module.exports.delete = async (request, response) => {
    const id = request.params["id"];
    try {
        const result = await UsuarioDAO.delete(id);
        response.sendStatus(result);
    } catch (error) {
        response.status(500).json("No se pudo eliminar al usuario");
    }
}

module.exports.login = async (request, response) => {
    const correo = request.body.correo;
    const password = request.body.password;
    try {
        const token = await UsuarioDAO.login(correo, password);
        if (token === 404) response.status(404);
        response.json(token);
    } catch (error) {
        response.status(500).json("Error al iniciar sesion");
    }
}
