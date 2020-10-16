const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");


const md_upload_category = multipart({ uploadDir: "./uploads/categories" });
const md_upload_employees = multipart({ uploadDir: "./uploads/employees" });
const md_upload_products = multipart({ uploadDir: "./uploads/products" });


const UsuarioController = require("../core/controllers/Usuario.controller");
const CategoriaController = require("../core/controllers/Categoria.controller");


router.get("/usuarios/get/:page", UsuarioController.get);
router.get("/usuarios/getbyrol/:rol", UsuarioController.getByRol);
router.patch("/updateuser/:id", UsuarioController.update);
router.post("/usuarios/add", UsuarioController.save);
router.delete("/usuarios/delete/:id", UsuarioController.delete);
router.post("/login", UsuarioController.login);

router.post("/categorias/agregar", md_upload_category, CategoriaController.save);
router.patch("/categorias/upload-image/:nombre", md_upload_category, CategoriaController.saveImage);
router.get("/categorias/get-image/:id", CategoriaController.getImagen);

module.exports = router;