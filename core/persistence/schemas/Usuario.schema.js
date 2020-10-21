const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UsuarioSchema = new Schema({
    correo: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, select: false },
    rol: { type: ObjectId, ref: "Rol", required: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Usuario", UsuarioSchema, "Usuarios");
