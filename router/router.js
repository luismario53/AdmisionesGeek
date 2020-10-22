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
const EmpleadoController = require("../core/controllers/Empleado.controller");
const AuthVerification = require("../middlewares/AuthVerification");

router.get("/usuarios/getbyrol/:rol", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.getByRol);
router.patch("/updateuser/:id", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.update);
router.post("/usuarios/add", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.save);
router.delete("/usuarios/delete/:id", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.delete);
router.get("/usuarios/:page", [AuthVerification.verificarToken, AuthVerification.isAdmin], UsuarioController.get);

router.patch("/categorias/update/:id", [AuthVerification.verificarToken, AuthVerification.isAux], CategoriaController.update);
router.get("/categorias/:page", [AuthVerification.verificarToken, AuthVerification.isCon], CategoriaController.get);
router.post("/categorias/agregar", [AuthVerification.verificarToken, AuthVerification.isAux], md_upload_category, CategoriaController.save);
router.patch("/categorias/upload-image/:id", [AuthVerification.verificarToken, AuthVerification.isAux], md_upload_category, CategoriaController.saveImage);
router.get("/categorias/get-image/:id", [AuthVerification.verificarToken, AuthVerification.isCon], CategoriaController.getImages);
router.delete("/categorias/delete/:id", [AuthVerification.verificarToken, AuthVerification.isAux], CategoriaController.delete);


router.get("/productos/getNames", [AuthVerification.verificarToken, AuthVerification.isCon], CategoriaController.getNames);
router.post("/productos/agregar", [AuthVerification.verificarToken, AuthVerification.isAux], ProductoController.save);
router.get("/productos/:page", [AuthVerification.verificarToken, AuthVerification.isCon], ProductoController.get);
router.patch("/productos/upload-image/:id", [AuthVerification.verificarToken, AuthVerification.isAux], md_upload_products, ProductoController.saveImage);
router.get("/productos/get-images/:id", [AuthVerification.verificarToken, AuthVerification.isCon], ProductoController.getImages);
router.patch("/productos/update/:id", [AuthVerification.verificarToken, AuthVerification.isAux], ProductoController.update);
router.delete("/productos/delete/:id", [AuthVerification.verificarToken, AuthVerification.isAux], ProductoController.delete);

router.post("/empleados/agregar", [AuthVerification.verificarToken, AuthVerification.isAux], EmpleadoController.save);
router.get("/empleados/:page", [AuthVerification.verificarToken, AuthVerification.isCon], EmpleadoController.get);
router.patch("/empleados/upload-image/:id", [AuthVerification.verificarToken, AuthVerification.isAux], md_upload_employees, EmpleadoController.saveImage);
router.get("/empleados/get-images/:id", [AuthVerification.verificarToken, AuthVerification.isCon], EmpleadoController.getImages);
router.delete("/empleados/delete/:id", [AuthVerification.verificarToken, AuthVerification.isAux], EmpleadoController.delete);

router.post("/login", UsuarioController.login);

router.get("/", [AuthVerification.verificarToken, AuthVerification.isCon]);

router.get("/adm", [AuthVerification.verificarToken, AuthVerification.isAdminAuth]);

module.exports = router;