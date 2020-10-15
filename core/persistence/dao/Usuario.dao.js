const { Logger } = require("mongodb");
const UsuarioModel = require("../schemas/Usuario.schema");
// const logger = require("../../../utils/logger");
const bcrypt = require("bcrypt");
const rounds = 10;

module.exports.save = async function (usuario) {
    const usuarios = await UsuarioModel.find();
    if (usuarios.includes(usuario.correo)) {
        // throw logger.error("Ya existe ese nombre de usuario");
    } else {
        bcrypt.hash(usuario.password, rounds, (err, hash) => {
            usuario.password = hash;
            const nuevoUsuario = new UsuarioModel(usuario);
            const result = nuevoUsuario.save();
            return result;
        });
    }
}

module.exports.get = async function (rol) {
    const result = UsuarioModel.findOne({ rol: rol });
    return result;
}

module.exports.getByRol = async function () {
    const result = UsuarioModel.find();
    return result;
}

//para actualizar usuario
module.exports.getById = async function (id) {
    const result = UsuarioModel.findById(id);
    return result;
}

module.exports.delete = async function (id) {
    await UsuarioModel.findByIdAndDelete(id);
}

module.exports.update = async function (viejo, nuevo) {
    const result = await UsuarioModel.updateOne(viejo, nuevo);
    return result;
}

module.exports.login = async function (correo, password) {
    const usuario = await UsuarioModel.find({ correo: correo });
    const match = await bcrypt.compare(password, usuario.password);
    if (match) {
        return usuario;
    }
}