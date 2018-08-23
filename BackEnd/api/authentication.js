var BitGoJS = require("bitgo");
require("dotenv").config();
const access = process.env.ACCESS_TOKEN;
var bitgo = new BitGoJS.BitGo({ env: "test", accessToken: `${access}` });
bitgo
  .session({})
  .then(function(res) {})
  .catch(function(err) {});
module.exports = bitgo;
