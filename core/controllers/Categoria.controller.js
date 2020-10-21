const CategoriaDAO = require("../persistence/dao/Categoria.dao");
const fs = require("fs");
const path = require("path");
const path_image = "http://localhost:4000/categorias/";

module.exports.save = async (request, response) => {
    const categoria = request.body;
    try {
        const result = await CategoriaDAO.save(categoria);
        if(result === 202){
            response.sendStatus(result);
        }else{
            response.status(200).json(result);
        }
    } catch (error) {
        response.sendStatus(500).json("Error creando la categoria");
    }
}

module.exports.getNames = async (request, response) =>{
    try {
        const result = await CategoriaDAO.getNames();
        if(!result) return response.status(404);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json("No se pudo obtener las categorias");
    }
}
module.exports.update = async (request, response) => {
    const id = request.params["id"];
    const nuevo = request.body;
    try {
        const viejo = await CategoriaDAO.getById(id);
        if (viejo) {
            const result = await CategoriaDAO.update(viejo, nuevo);
            response.sendStatus(result);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.status(500).json("No se pudo actualizar la categoria");
    }
}

module.exports.getCategories = async (request, response) => {
    try {
        const result = await CategoriaDAO.getCategories();
        if (result) {
            response.status(200).json(result);
        } else {
            response.sendStatus(202);
        }

    } catch (error) {
        response.status(500).json("No se pudo actualizar la categoria");
    }

}

module.exports.get = async (request, response) => {
    const page = parseInt(request.params["page"]);
    try {
        let sizeResult = await CategoriaDAO.getSize();
        const CategoriaResult = await CategoriaDAO.get(page);
        if (CategoriaResult) {
            if (sizeResult > 0) {
                if (!Number.isInteger(sizeResult / 10)) {
                    sizeResult = parseInt(sizeResult / 10) + 1;
                } else {
                    sizeResult = parseInt(sizeResult / 10)
                }
            }
            const result = {
                size: sizeResult,
                categories: CategoriaResult
            }
            response.status(200).json(result);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.sendStatus(500);
    }
}

module.exports.delete = async (request, response) => {
    const id = request.params["id"];
    try {
        const result = await CategoriaDAO.delete(id);
        if (result) {
            try {
                fs.unlinkSync("./uploads/categorias/" + result.imagen);
            } catch (error) {
                console.log(error);
            }
        }
        response.sendStatus(200);
    } catch (error) {
        response.status(500).json("No se pudo eliminar al usuario");
    }
}

module.exports.saveImage = async (request, response) => {

    const id = request.params["id"];
    if (!request.files.file0) {
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
            const oldImage = await CategoriaDAO.getById(id);
            if (oldImage.imagen !== 'default') {
                try {
                    fs.unlinkSync("./uploads/categorias/" + oldImage.imagen);
                } catch (error) {
                    console.log(error);
                }
            }
            const result = await CategoriaDAO.saveImage(file_name, id);
            response.sendStatus(200);
        } catch (error) {
            response.sendStatus(500).json("Error subiendo imagen");
        }
    }
}

module.exports.getImagen = async (request, response) => {
    var id = request.params["id"];
    try {
        const result = await CategoriaDAO.getImagen(id);
        if (result) {
            var path_file = path_image + result.imagen;
            // response.sendFile(path.resolve(path_file));
            response.status(200).json(path_file);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
    }
}