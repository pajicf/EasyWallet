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

router.get(`${walletPath}:id?:coin?`, (req, res) => {
  const walletId = req.query.id;
  console.log("WalletID:" + walletId);
  bitgo
    .coin(`${req.query.coin}`)
    .wallets()
    .get({ id: walletId })
    .then(function(wallet) {
      console.log();
      res.json(wallet._wallet);
      console.log(wallet._wallet);
    })
    .catch(error => {
      console.log("TEST");
      res.status(404);
      res.json({ message: error });
    });
});
router.post(walletPath, (req, res) => {
  console.log("ubij me");
  bitgo
    .coin(`${req.body.coin}`)
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
    .catch(error => {
      //res.status(500);
      res.json({ messsage: "Error!" });
    });
});

router.get(`${walletPath}/trans/:id?:coin?`, (req, res) => {
  var walletId = req.query.id;
  bitgo
    .coin(`${req.query.coin}`)
    .wallets()
    .get({ id: walletId })
    .then(function(wallet) {
      wallet.transfers().then(transfers => {
        console.dir(transfers);
        res.json(transfers);
      });
    });
});

router.post(`${walletPath}/send`, (req, res) => {
  bitgo
    .coin(`${req.body.coin}`)

    .wallets()
    .get({ id: req.body.walletId })
    .then(function(wallet) {
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

router.post(`${walletPath}/addr/:id`, (req, res) => {
  wallet.getAddress({ id: `${req.params.id}` }).then(function(address) {
    res.json(address.address);
    console.dir(address);
  });
});
module.exports = router;
