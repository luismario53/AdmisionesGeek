const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ProductoSchema = new Schema({
    nombre: { type: String, required: true, maxlength: 50 },
    descripcion: { type: String, required: true, maxlength: 100 },
    imagenes: [{ type: String, required: true }],
    precio: { type: Number, required: true },
    categoria: { type: ObjectId, ref: "Categoria", required: false }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Producto", ProductoSchema, "Productos");
