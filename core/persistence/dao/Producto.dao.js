const ProductoModel = require("../schemas/Productos.schema");

module.exports.save = async (producto) => {
    const productos = await ProductoModel.exists({
        nombre: producto.nombre,
        categoria: producto.categoria
    });
    if (!productos) {
        const nuevoProducto = new ProductoModel(producto);
        const result = await nuevoProducto.save();
        return result;
    } else {
        return 202;
    }
}

module.exports.deleteImages = async (id, imagen) => {
    const result = await ProductoModel.updateOne(
        { _id: id },
        { $pull: { imagenes: imagen } });
}

module.exports.get = async (page) => {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const result = await ProductoModel.find().skip(skip).limit(PAGE_SIZE).
        populate({
            path: 'categoria',
            select: '-descripcion -productos -imagen -createdAt -updatedAt'
        });
    return result;
}

module.exports.delete = async (id) => {
    const result = await ProductoModel.findByIdAndDelete(id);
    return result;
}

module.exports.getById = async (id) => {
    const result = await ProductoModel.findById(id);
    return result;
}


module.exports.getSize = async () => {
    const result = ProductoModel.find().countDocuments();
    return result;
}

module.exports.saveImage = async (imagenes, id) => {
    const result = await ProductoModel.updateOne(
        { _id: id },
        { $push: { imagenes: { $each: imagenes } } });
    return 200;
}

module.exports.getImages = async (id) => {
    const result = await ProductoModel.findById(id);
    return result;
}

module.exports.update = async (viejo, nuevo) => {
    const result = await ProductoModel.updateOne(viejo, nuevo);
    return 200;
}
