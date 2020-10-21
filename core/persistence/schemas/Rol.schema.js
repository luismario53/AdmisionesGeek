const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolSchema = new Schema({
    rol: { type: String, required: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Rol", rolSchema, "Roles");
