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

module.exports.update = async (viejo, nuevo) => {
    const result = await CategoriaModel.updateOne(viejo, nuevo);
    return 200;
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