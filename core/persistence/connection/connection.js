const config = require("../../../config");
const mongoose = require("mongoose");
// const logger = require("../../../utils/logger");

mongoose.connect(config.mongodb.defaultconnection, {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    // logger.info(`Mongoose connected to: ${config.mongodb.defaultconnection}`);
});

mongoose.connection.on("error", (err) => {
    // logger.error(`Mongoose error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
    // logger.info(`Mongoose disconnected`);
});