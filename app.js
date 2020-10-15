const express = require("express");
const app = express();
const port = 3000;
require("./core/persistence/connection/connection");

app.use(express.json());

app.use("/", require("./router/router"));

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`Ejemplo de servidor pendejo en el puerto ${port}`);
});