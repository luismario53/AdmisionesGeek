const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const CategoriaSchema = new Schema({
    nombre: { type: String, required: true, maxlength: 50 },
    descripcion: { type: String, required: true, maxlength: 100 },
    imagen: { type: String, required: true },
    listaProductos: [{ type: ObjectId, ref: "Producto" }]
}, { timestamps: true });

module.exports = mongoose.model("Categoria", CategoriaSchema, "Categorias");
