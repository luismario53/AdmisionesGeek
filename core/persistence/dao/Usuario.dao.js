const UsuarioModel = require("../schemas/Usuario.schema");
// const logger = require("../../../utils/logger");
const bcrypt = require("bcrypt");
const rounds = 10;

module.exports.save = async (usuario) => {

    const usuarios = await UsuarioModel.exists({ correo: usuario.correo });
    if (!usuarios) {
        const hash = await bcrypt.hash(usuario.password, rounds);
        usuario.password = hash;
        const nuevoUsuario = new UsuarioModel(usuario);
        const result = await nuevoUsuario.save();
        return 200;
    } else {
        return 202;
    }
}

module.exports.get = async (page) => {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const result = UsuarioModel.find().skip(skip).limit(PAGE_SIZE);
    return result;
}

module.exports.getSize = async () => {
    const result = UsuarioModel.find().countDocuments();
    return result;
}

module.exports.getByRol = async (rol) => {
    const result = UsuarioModel.find({ rol: { $regex: rol } });
    return result;
}

//para actualizar usuario
module.exports.getById = async (id) => {
    const result = UsuarioModel.findById(id);
    return result;
}

module.exports.delete = async (id) => {
    await UsuarioModel.findByIdAndDelete(id);
    return 200;
}

module.exports.update = async (viejo, nuevo) => {
    const result = await UsuarioModel.updateOne(viejo, nuevo);
    return 200;
}

module.exports.login = async (correo, password) => {
    const usuario = await UsuarioModel.findOne({ correo: correo });
    const match = await bcrypt.compare(password, usuario.password);
    if (match) {
        return 200;
    } else {
        return 401;
    }
}