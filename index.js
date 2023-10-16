require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routesHandler = require("./routes/router.js");
const app = express();
const port = process.env.PORT || 3010;
const mongoKeys = process.env.DB_CONN;

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(mongoKeys, dbOptions)
    .then(() => {
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use("/", routesHandler);
    })
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Starting app on ${port}`);
});
