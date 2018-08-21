var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
const walletPath = "/wallet";
//var controller=require('../controllers/walletController');
var bitgo = require("../authentication");
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

router.get(`${walletPath}/:id`, (req, res) => {
  const walletId = req.params.id;
  console.log("WalletID:" + walletId);
  bitgo
    .coin("tbtc")
    .wallets()
    .get({ id: walletId })
    .then(function(wallet) {
      console.log();
      res.json(wallet._wallet);
      console.log(wallet._wallet);
    })
    .catch(error => {
      res.json("Error:", error);
    });
});
router.post(walletPath, (req, res) => {
  console.log("ubij me");
  bitgo
    .coin("tbtc")
    .wallets()
    .generateWallet({
      label: "My Test Wallet",
      passphrase: process.env.PassPhrase
    })
    .then(function(wallet) {
      // wallet=wallet._wallet;
      res.json(wallet.wallet._wallet);
      //print the new wallet
      console.log(wallet);
    })
    /*.then(function(wallet) {
      return wallet.addWebhook({
        url: 'http://localhost:8080/wallet/transfer',
        type: "transfer"
      });
    })
    .then(function(wallet) {
      return wallet.addWebhook({
        url: 'http://localhost:8080/wallet/approve',
        type: "pendingapproval"
      });
    })
    .then(function(webhook) {
      // print the new webhook
      console.dir(webhook);
    })*/
    .catch(error => {
      //res.status(500);
      res.json({ messsage: "Error!" });
    });
});

router.get(`${walletPath}/trans/:id`, (req, res) => {
  var id = req.params.id;
  bitgo
    .coin("tbtc")
    .wallets()
    .get({ id: walletId })
    .then(function(wallet) {
      var transactions = wallet.transactions();
      console.log(transactions);
      res.json(transactions);
    });
  //send 'list transactions' request to bitGo server
  //put the list in res.json
});
router.post(`${walletPath}/send`, (req, res) => {
  bitgo
    .coin("tbtc")
    .wallets()
    .get({ id: req.body.walletId })
    .then(function(wallet) {
      //build
      console.dir(req.body.address);
      let params = {
        amount: req.body.amount,
        address: req.body.address,
        walletPassphrase: process.env.PassPhrase
      };
      wallet.send(params).then(transaction => {
        console.dir(transaction);
      });
    });
});

router.get(`${walletPath}/transfer`, (req, res) => {});
router.get(`${walletPath}/approve`, (req, res) => {
  //set up a system where whenever our send transaction is approved we get info back
  //and notify the front with the nessecary information. :)
});
router.post(`${walletPath}/addr/:id`, (req, res) => {
  wallet.getAddress({ id: `${req.params.id}` }).then(function(address) {
    // print address
    res.json(address.address);
    console.dir(address);
  });
  //gets the public key, that is sent to the frontend
});

router.post("/test",(req,res)=>{
  setTimeout(res.json({id: "RESPONSE!!!"}),5000);
});
module.exports = router;
