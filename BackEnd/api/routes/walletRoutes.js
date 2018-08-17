var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
const walletPath="/wallet";
//var controller=require('../controllers/walletController');
var bitgo=require('../authentication');
//console.log(bitgo);
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




router.get(`${walletPath}/:id`,(req, res)=>{
    const walletId =req.params.id;
    console.log("WalletID:"+walletId);
    bitgo.coin('tbtc').wallets().get({ id: walletId })
    .then(function(wallet) {
        console.log()
        res.json(wallet._wallet);
    console.log(wallet._wallet);
});
});
router.post(walletPath,(req,res)=>{
    console.log("ubij me");
    bitgo.coin('tltc').wallets()
    .generateWallet({ label: 'My Test Wallet', passphrase: 'test1234' })
    .then(function(wallet) {
        res.json(wallet._wallet);
  // print the new wallet
     //console.log(wallet);
}).catch(error => {
    //res.status(500);
    res.json({ messsage: "Error!" });
  });
});

router.get(`${walletPath}/trans/:id`,(req,res)=>{
        //send 'list transactions' request to bitGo server
        //put the list in res.json
});
router.post(`${walletPath}/send`,(req,res)=>{
    bitgo.coin('tbtc').wallets().get({ id: req.body.walletId })
    .then(function(wallet){
        //build
        let params = {
            recipients: [
              {
                "amount": req.body.amount,
                "address": req.body.address
              }
            ]
          };
          wallet.prebuildTransaction(params)
          .then(function(builtTransaction) {
            //sign
            console.log("Built transaction:"+builtTransaction);
            let signParams={
                "txPrebuild": builtTransaction,
                "prv": wallet._wallet.keys[0]
            };
            console.log(signParams.prv);
          //  var encryptedString = '{"iv":"VncyeOxU/zwkma2AW97buQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode" :"ccm","adata":"","cipher":"aes","salt":"yr1dZrvacDM=","ct":"3vJ8N8mVALEasC Htw1eWgoLy2Oh3yvNEiEdToJ/R/YfWOJWro1rnAlUfsBnDy2c4huUVZ0NDU3ocNsmXLuFd3gmzs +Pg6rBF2OUbOQ5bQXcuruKpRRe3Nra3cCr5UHIJhRdwALnip6pHsGSqaj/syrWKPIiujQI="}';
          //  var decryptedString = bitgo.decrypt({ password: "", input: encryptedString });
           // console.log(decryptedString);
            wallet.signTransaction(signParams)
           .then(function(signedTransaction) {
                console.log("signed transaction:"+signedTransaction);
               let sendParams={
                   "txHex": signedTransaction.body.txHex,
                   "otp":'0000000'
               };
           //send
           wallet.submitTransaction(signedParams)
            .then(function(signed) {
            // print transaction status
            console.dir("Signed:"+signed);
            });   
        });
    });
});


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