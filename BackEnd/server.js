const express = require("../node_modules/express");
var router = require("./api/routes/walletRoutes.js");
var app = express();
var bitgo=require("./api/authentication");

app.use("/", router);
//app.use(bitgo);

app.listen(8080, () => console.log("Server listening on port 8080!"));
