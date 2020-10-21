const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");

router.use((request, response, next) => {
    response.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


const md_upload_category = multipart({ uploadDir: "./uploads/categorias" });
const md_upload_employees = multipart({ uploadDir: "./uploads/empleados" });
const md_upload_products = multipart({ uploadDir: "./uploads/productos" });

const UsuarioController = require("../core/controllers/Usuario.controller");
const CategoriaController = require("../core/controllers/Categoria.controller");
const ProductoController = require("../core/controllers/Producto.controller");
const AuthVerification = require("../middlewares/AuthVerification");

router.get("/usuarios/getbyrol/:rol", UsuarioController.getByRol);
router.patch("/updateuser/:id", UsuarioController.update);
router.post("/usuarios/add", UsuarioController.save);
router.delete("/usuarios/delete/:id", UsuarioController.delete);
router.get("/usuarios/:page", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.get);

router.patch("/categorias/update/:id", CategoriaController.update);
router.get("/categorias/:page", [AuthVerification.verificarToken, AuthVerification.isAux], CategoriaController.get);
router.post("/categorias/agregar", md_upload_category, CategoriaController.save);
router.patch("/categorias/upload-image/:id", md_upload_category, CategoriaController.saveImage);
router.get("/categorias/get-image/:id", CategoriaController.getImagen);
router.delete("/categorias/delete/:id", CategoriaController.delete);


router.get("/productos/getNames", [AuthVerification.verificarToken, AuthVerification.isAux], CategoriaController.getNames);
router.post("/productos/agregar", ProductoController.save);
router.get("/productos/:page", [AuthVerification.verificarToken, AuthVerification.isAux], ProductoController.get);
router.patch("/productos/upload-image/:id", md_upload_products, ProductoController.saveImage);
router.get("/productos/get-images/:id", ProductoController.getImages);
router.patch("/productos/update/:id", ProductoController.update);
router.delete("/productos/delete/:id", ProductoController.delete);

router.post("/login", UsuarioController.login);

router.get("/", [AuthVerification.verificarToken, AuthVerification.isAux]);

router.get("/adm", [AuthVerification.verificarToken, AuthVerification.isAdminAuth]);

module.exports = router;