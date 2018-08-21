var BitGoJS = require("bitgo");
require("dotenv").config();
const access = process.env.ACCESS_TOKEN;
//console.log(access);
var bitgo = new BitGoJS.BitGo({ env: "test", accessToken: `${access}` });
//console.log(bitgo);
//console.log("BitGoJS library version: " + bitgo.version());
bitgo
  .session({})
  .then(function(res) {
    //console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });
module.exports = bitgo;
