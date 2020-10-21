const RolModel = require("../core/persistence/schemas/Rol.schema");

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