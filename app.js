const express = require("express");
const app = express();
const port = 4000;
require("./core/persistence/connection/connection");
const cors = require("cors");
const morgan = require("morgan");
const setUp = require("./lib/initialSetup");

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('uploads'));
setUp.saveRoles();

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, PATCH, POST, OPTIONS, PUT, DELETE');
//     console.log("paso");
//     next();
// });

app.use("/", require("./router/router"));



app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});