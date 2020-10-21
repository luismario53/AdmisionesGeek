const RolModel = require("../schemas/Rol.schema");

module.exports.getById = async (rol) => {
    const roles = RolModel.find({ _id: { $in: rol } });
    return roles;
}