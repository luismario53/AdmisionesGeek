const CategoriaModel = require("../schemas/Categoria.schema");

module.exports.save = async (categoria) => {
    const categorias = await CategoriaModel.exists({ nombre: categoria.nombre });
    if (!categorias) {
        const nuevaCategoria = new CategoriaModel(categoria);
        const result = await nuevaCategoria.save();
        return result;
    } else {
        return 202;
    }
}

module.exports.addToCategory = async (idCategoria, idProducto) => {
    const result = await CategoriaModel.updateOne(
        { _id: idCategoria },
        { $push: { productos: idProducto } });
    return 200;
}

// module.exports.updateToCategory = async (idCategoria, idProducto) => {
//     const result = await CategoriaModel.updateOne(
//         { _id: idCategoria },
//         { $push: { productos: idProducto } });
//     return 200;
// }

module.exports.deleteToCategory = async (idCategoria, idProducto) => {
    const result = await CategoriaModel.updateOne(
        { _id: idCategoria },
        { $pull: { productos: idProducto } });
    return 200;
}

module.exports.update = async (viejo, nuevo) => {
    const result = await CategoriaModel.updateOne(viejo, nuevo);
    return 200;
}

module.exports.getNames = async () => {
    const result = await CategoriaModel.find().select("-productos -descripcion -imagen -createdAt -updatedAt");
    return result;
}

module.exports.get = async (page) => {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const result = await CategoriaModel.find().skip(skip).limit(PAGE_SIZE);
    return result;
}

module.exports.getById = async (id) => {
    const result = await CategoriaModel.findById(id);
    return result;
}

module.exports.delete = async (id) => {
    const result = await CategoriaModel.findByIdAndDelete(id);
    return result;
}

module.exports.getSize = async () => {
    const result = CategoriaModel.find().countDocuments();
    return result;
}

module.exports.saveImage = async (image, id) => {
    const result = await CategoriaModel.updateOne({ _id: id }, { imagen: image });
    return 200;
}

module.exports.getImagen = async (id) => {
    const result = await CategoriaModel.findById(id);
    return result;
}