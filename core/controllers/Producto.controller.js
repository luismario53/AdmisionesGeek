const ProductoDAO = require("../persistence/dao/Producto.dao");
const CategoriaDAO = require("../persistence/dao/Categoria.dao");
const fs = require("fs");
const path_image = "http://localhost:4000/productos/";

module.exports.save = async (request, response) => {
    const producto = request.body;
    try {
        const result = await ProductoDAO.save(producto);
        if (result === 202) {
            response.sendStatus(result);
        } else {
            const add = await CategoriaDAO.addToCategory(result.categoria, result._id);
            if (add === 200) {
                response.status(200).json(result);
            }
        }
    } catch (error) {
        response.sendStatus(500).json("Error creando al usuario");
    }
}

module.exports.update = async (request, response) => {
    const id = request.params["id"];
    const nuevo = request.body;
    try {
        const viejo = await ProductoDAO.getById(id);
        if (viejo) {
            const result = await ProductoDAO.update(viejo, nuevo);
            response.sendStatus(result);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.status(500).json("No se pudo actualizar el producto");
    }
}

module.exports.get = async (request, response) => {
    const page = parseInt(request.params["page"]);
    try {
        let sizeResult = await ProductoDAO.getSize();
        const productResult = await ProductoDAO.get(page);
        if (productResult) {
            if (sizeResult > 0) {
                if (!Number.isInteger(sizeResult / 10)) {
                    sizeResult = parseInt(sizeResult / 10) + 1;
                } else {
                    sizeResult = parseInt(sizeResult / 10)
                }
            }
            const result = {
                size: sizeResult,
                productos: productResult
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
        const result = await ProductoDAO.delete(id);
        if (result) {
            for (let i = 0; i < result.imagenes.length; i++) {
                try {
                    fs.unlinkSync("./uploads/productos/" + result.imagenes[i]);
                } catch (error) {
                    console.log(error);
                }
            }
            const rem = await CategoriaDAO.deleteToCategory(result.categoria, result._id);
            if (rem === 200) {
                response.sendStatus(200);
            }
        }
    } catch (error) {
        response.status(400).json("No se pudo eliminar al usuario");
    }
}

module.exports.saveImage = async (request, response) => {

    if (!request.files) {
        response.sendStatus(404).json("Error subiendo imagen");
    }
    const id = request.params["id"];

    let imagenes = [];
    for (let i = 0; i < 3; i++) {
        if (request.files[`file${i}`] !== undefined) {
            var file_path = request.files[`file${i}`].path;
            var file_split = file_path.split("\\");

            var file_name = file_split[file_split.length - 1];

            var extension_split = file_name.split("\.");
            file_ext = extension_split[extension_split.length - 1];
            if (file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "PNG") {
                fs.unlink(file_path, (error) => {
                    response.sendStatus(500).json("Extension no valida");
                });
            } else {
                imagenes.push(file_name);
            }
        }
    }
    try {
        const oldImage = await ProductoDAO.getById(id);
        if (oldImage.imagenes.length > 0) {
            for (let i = 0; i < oldImage.imagenes.length; i++) {
                try {
                    fs.unlinkSync("./uploads/productos/" + oldImage.imagenes[i]);
                } catch (error) {
                    console.log(error);
                }
            }
            //const rem = await CategoriaDAO.deleteToCategory(result.categoria, result._id);
        }
        const result = await ProductoDAO.saveImage(imagenes, id);
        response.sendStatus(result);
    } catch (error) {
        response.sendStatus(500).json("Error subiendo imagen");
    }

}

module.exports.getImages = async (request, response) => {
    var id = request.params["id"];
    try {
        const result = await ProductoDAO.getImages(id);
        if (result) {
            let imagenes = [];
            for (let i = 0; i < result.imagenes.length; i++) {
                imagenes.push(path_image + result.imagenes[i]);
            }
            response.status(200).json(imagenes);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
    }
}
