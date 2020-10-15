const express = require("express");
const router = express.Router();

const UsuarioController = require("../core/controllers/Usuario.controller");

router.get("/getusuarios", UsuarioController.get);
router.get("/getbyrol", UsuarioController.getByRol);
router.patch("/updateUser", UsuarioController.update);
router.post("/saveuser", UsuarioController.save);
router.delete("/deleteuser", UsuarioController.delete);
router.post("/login", UsuarioController.login);

module.exports = router;