const CategoriaModel = require("../schemas/Categoria.schema");

module.exports.save = async (categoria) => {
    const categorias = await CategoriaModel.exists({ nombre: categoria.nombre });
    if (!categorias) {
        const nuevaCategoria = new CategoriaModel(categoria);
        const result = await nuevaCategoria.save();
        return 200;
    } else {
        return 202;
    }
}

module.exports.saveImage = async (image, nombre) => {
    const result = await CategoriaModel.updateOne({ nombre: nombre }, { imagen: image });
    return 200;
}

module.exports.getImagen = async (id) => {
    const result = await CategoriaModel.findById(id);
    return result;
}