const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipoUsuarioEnum = require("../enums/TipoUsuario.enum");

const UsuarioSchema = new Schema({
    correo: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: TipoUsuarioEnum.getAll() }
}, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema, "Usuarios");
