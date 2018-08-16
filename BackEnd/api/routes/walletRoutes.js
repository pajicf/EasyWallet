var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
const walletPath="/wallet";
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});




router.get(`${walletPath}/:id`,(req,res)=>{
    //send 'get wallet by id' request to bitGo server
    //put wallet info in res.json
});
router.get(walletPath,(req,res)=>{
    //send wallet generator request to bitGo server
    //put wallet info in res.json
});

router.get(`${walletPath}/trans/:id`,(req,res)=>{
        //send 'list transactions' request to bitGo server
        //put the list in res.json
});
router.get(`${walletPath}/send`,(req,res)=>{
    //front sends json with wallet id, amount of coins,which coin is it and the address of the receiver
    //we send 'build transaction','sign transaction' and 'send transaction' reqs to bitGo server and
    //confirm to front that the request is added in the blockchain and will be soon processed
});
router.get(`${walletPath}/transfer`,(req,res)=>{
    //set up webhook so that we get notified whenever someone has sent us cash
    //sent to front transaction id,address,amount and status of the transaction
});
router.get(`${walletPath}/approve/:id`,(req,res)=>{
    //set up a system where whenever our send transaction is approved we get info back
    //and notify the front with the nessecary information. :)
});
module.exports = router;