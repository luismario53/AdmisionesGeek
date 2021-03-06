const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const EmpleadoSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    Direccion: { type: String, required: true, maxlength: 50 },
    telefono: { type: Number, required: true, minlength: 10 },
    imagen: { type: String, required: true },
    horario: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Empleado", EmpleadoSchema, "Empleados");
