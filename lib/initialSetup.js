const RolModel = require("../core/persistence/schemas/Rol.schema");
const UserModel = require("../core/persistence/schemas/Usuario.schema");
const bcrypt = require("bcrypt");

module.exports.saveRoles = async () => {
    try {
        const roles = await RolModel.estimatedDocumentCount();
        if (roles > 0) return;

        const result = await Promise.all([
            new RolModel({ rol: "Administrador" }).save(),
            new RolModel({ rol: "Auxiliar" }).save(),
            new RolModel({ rol: "Consultor" }).save()
        ]);
    } catch (error) {

    }
}

module.exports.firstUser = async () => {
    try {
        const rol = await RolModel.findOne({ rol: "Administrador" });
        const usuarios = await UserModel.estimatedDocumentCount();
        const hash = await bcrypt.hash("password123", 10);
        if (usuarios > 0) return;
        const result = await Promise.all([
            new UserModel({
                correo: "correoadm@gmail.com",
                password: hash,
                rol: rol._id
            }).save(),
        ]);
    } catch (error) {

    }
}