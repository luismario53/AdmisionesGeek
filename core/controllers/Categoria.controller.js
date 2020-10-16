const CategoriaDAO = require("../persistence/dao/Categoria.dao");
const fs = require("fs");
const path = require("path");

module.exports.save = async (request, response) => {
    const categoria = request.body;
    try {
        const result = await CategoriaDAO.save(categoria);
        response.sendStatus(result);
    } catch (error) {
        response.sendStatus(500).json("Error creando al usuario");
    }
}

module.exports.saveImage = async (request, response) => {

    const nombre = request.params["nombre"];
    if (!request.files) {
        response.sendStatus(404).json("Error subiendo imagen");
    }

    var file_path = request.files.file0.path;
    var file_split = file_path.split("\\");
    var file_name = file_split[file_split.length - 1];
    var extension_split = file_name.split("\.");
    var file_ext = extension_split[extension_split.length - 1];

    if (file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "PNG") {
        fs.unlink(file_path, (error) => {
            response.sendStatus(500).json("Extension no valida");
        });
    } else {
        try {
            const result = await CategoriaDAO.saveImage(file_name, nombre);
            response.sendStatus(result);
        } catch (error) {
            response.sendStatus(500).json("Error subiendo imagen");
        }
    }
}

module.exports.getImagen = async (request, response) => {
    var id = request.params["id"];
    try {
        const result = await CategoriaDAO.getImagen(id);
        var path_file = "./uploads/categorias/" + result.imagen;
        response.sendFile(path.resolve(path_file));
    } catch (error) {
        response.sendStatus(500).json("Error trayendo imagen");
    }

}