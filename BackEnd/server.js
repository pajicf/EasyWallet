const express = require("../node_modules/express");
var router = require("./api/routes/walletRoutes.js");
var app = express();


app.use("/", router);


app.listen(8080, () => console.log("Server listening on port 8080!"));
