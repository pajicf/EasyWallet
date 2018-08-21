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
    });
});
router.post(walletPath, (req, res) => {
  console.log("ubij me");
  bitgo
    .coin("tbtc")
    .wallets()
    .generateWallet({ label: "My Test Wallet", passphrase: "test1234" })
    .then(function(wallet) {
      res.json(wallet._wallet);
      // print the new wallet
      console.log(wallet);
    })
    .catch(error => {
      //res.status(500);
      res.json({ messsage: "Error!" });
    });
});

router.get(`${walletPath}/trans/:id`, (req, res) => {
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
        walletPassphrase: "xd"
      };
      wallet.send(params).then(transaction => {
        console.dir(transaction);
      });
    });
});

router.get(`${walletPath}/transfer`, (req, res) => {
  //set up webhook so that we get notified whenever someone has sent us cash
  //sent to front transaction id,address,amount and status of the transaction
});
router.get(`${walletPath}/approve/:id`, (req, res) => {
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
module.exports = router;
