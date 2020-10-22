const jwt = require("jsonwebtoken");
const UsuarioModel = require("../core/persistence/dao/Usuario.dao");
const RolModel = require("../core/persistence/dao/Rol.dao");
const config = require("../config");

module.exports.verificarToken = async (request, response, next) => {
    let token = request.headers["authorization"];
    if (!token) return response.sendStatus(403);

    try {
        const decoded = jwt.verify(token, config.secret);
        request.userId = decoded.id;
        const usuario = await UsuarioModel.getById(request.userId);
        if (!usuario) return response.status(404).json({ message: "No user" });
        next();
    } catch (error) {
        return response.status(401).json({ message: error });
    }
}

module.exports.isAdmin = async (request, response, next) => {
    try {
        const usuario = await UsuarioModel.getById(request.userId);
        const roles = await RolModel.getById(usuario.rol);
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].rol === "Administrador") {
                next();
                return;
            }
        }
        return response.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        return response.status(500).send({ message: error });
    }
}

module.exports.isAdminAuth = async (request, response, next) => {
    try {
        const usuario = await UsuarioModel.getById(request.userId);
        const roles = await RolModel.getById(usuario.rol);
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].rol === "Administrador") {

                return response.sendStatus(200);
            }
        }
        return response.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        return response.status(500).send({ message: error });
    }
}

module.exports.isAux = async (request, response, next) => {
    try {
        const usuario = await UsuarioModel.getById(request.userId);
        const roles = await RolModel.getById(usuario.rol);

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].rol === "Auxiliar" || roles[i].rol === "Administrador") {
                next();
                return;
            }
        }
        return response.status(403).json({ message: "Require Auxiliar Role!" });
    } catch (error) {
        return response.status(500).send({ message: error });
    }
}