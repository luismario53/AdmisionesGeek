const EmpleadoModel = require("../schemas/Empleados.schema");

module.exports.save = async (empleado) => {

    const old = await EmpleadoModel.exists({ nombre: empleado.nombre, apellidos: empleado.apellidos });
    if (!old) {

        const nuevoEmpleado = new EmpleadoModel(empleado);
        const result = await nuevoEmpleado.save();
        return result;
    } else {
        return 202;
    }
}

module.exports.get = async (page) => {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const result = await EmpleadoModel.find().skip(skip).limit(PAGE_SIZE);
    return result;
}

module.exports.getById = async (id) => {
    const result = await EmpleadoModel.findById(id);
    return result;
}

module.exports.update = async () => {
    const result = await EmpleadoModel.updateOne(viejo, nuevo);
    return 200;
}

module.exports.delete = async (id) => {
    const result = await EmpleadoModel.findByIdAndDelete(id);
    return result;
}


module.exports.getSize = async () => {
    const result = EmpleadoModel.find().countDocuments();
    return result;
}


module.exports.saveImage = async (image, id) => {
    console.log(image)
    console.log(id)
    const result = await EmpleadoModel.updateOne({ _id: id }, { imagen: image });
    return 200;
}

module.exports.getImagen = async (id) => {
    const result = await EmpleadoModel.findById(id);
    return result;
}