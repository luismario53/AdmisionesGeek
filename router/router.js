const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");


const md_upload_category = multipart({ uploadDir: "./uploads/categorias" });
const md_upload_employees = multipart({ uploadDir: "./uploads/empleados" });
const md_upload_products = multipart({ uploadDir: "./uploads/productos" });


const UsuarioController = require("../core/controllers/Usuario.controller");
const CategoriaController = require("../core/controllers/Categoria.controller");


router.get("/usuarios/get/:page", UsuarioController.get);
router.get("/usuarios/getbyrol/:rol", UsuarioController.getByRol);
router.patch("/updateuser/:id", UsuarioController.update);
router.post("/usuarios/add", UsuarioController.save);
router.delete("/usuarios/delete/:id", UsuarioController.delete);
router.post("/login", UsuarioController.login);

router.patch("/categorias/update/:id", CategoriaController.update);
router.get("/categorias/get/:page", CategoriaController.get);
router.post("/categorias/agregar", md_upload_category, CategoriaController.save);
router.patch("/categorias/upload-image/:id", md_upload_category, CategoriaController.saveImage);
router.get("/categorias/get-image/:id", CategoriaController.getImagen);
router.delete("/categorias/delete/:id", CategoriaController.delete);

module.exports = router;