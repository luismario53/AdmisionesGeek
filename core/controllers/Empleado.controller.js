const EmpleadoDAO = require("../persistence/dao/Empleado.dao");
const path_image = "http://localhost:4000/empleados/";

module.exports.save = async (request, response) => {
    const empleado = request.body;
    try {
        const result = await EmpleadoDAO.save(empleado);
        if (result === 202) {
            response.sendStatus(result);
        } else {
            response.status(200).json(result);
        }
    } catch (error) {
        response.sendStatus(error).json();
    }
}

module.exports.get = async (request, response) => {
    const page = parseInt(request.params["page"]);
    try {
        let sizeResult = await EmpleadoDAO.getSize();
        const empleadosResult = await EmpleadoDAO.get(page);
        if (empleadosResult) {
            if (sizeResult > 0) {
                if (!Number.isInteger(sizeResult / 10)) {
                    sizeResult = parseInt(sizeResult / 10) + 1;
                } else {
                    sizeResult = parseInt(sizeResult / 10)
                }
            }
            const result = {
                size: sizeResult,
                empleados: empleadosResult
            }
            response.status(200).json(result);
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.sendStatus(500);
    }
}

module.exports.update = async(request, response) =>{

}

module.exports.delete = async (request, response) => {
    const id = request.params["id"];
    try {
        const result = await EmpleadoDAO.delete(id);
        if (result) {
            try {
                fs.unlinkSync("./uploads/empleados/" + result.imagen);
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
            console.log("llego aqui ")
            const oldImage = await EmpleadoDAO.getById(id);
            if (oldImage.imagen !== 'default') {
                try {
                    fs.unlinkSync("./uploads/empleados/" + oldImage.imagen);
                } catch (error) {
                    console.log(error);
                }
            }
            const result = await EmpleadoDAO.saveImage(file_name, id);
            response.sendStatus(200);
        } catch (error) {
            response.sendStatus(500).json("Error subiendo imagen");
        }
    }
}

module.exports.getImages = async (request, response) => {
    var id = request.params["id"];
    try {
        const result = await EmpleadoDAO.getImagen(id);
        console.log(result.imagen)
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