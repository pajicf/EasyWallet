var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
const walletPath = "/wallet";
var bitgo = require("../authentication");
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
  bitgo
    .coin(`${req.query.coin}`)
    .wallets()
    .get({ id: walletId })
    .then(function(wallet) {
      res.status(200);
      res.json(wallet._wallet);
    })
    .catch(error => {
      res.status(404);
      res.json({ message: error });
    });
});

router.post(walletPath, (req, res) => {
  var lbl=req.body.label;
  if(!lbl) lbl="My Test Wallet";
  bitgo
    .coin(`${req.body.coin}`)
    .wallets()
    .generateWallet({
      label: lbl,
      passphrase: process.env.PassPhrase
    })
    .then(function(wallet) {
      res.json(wallet.wallet._wallet);
      //print the new wallet
    })
    .catch(error => {
      res.json({ messsage: "Error!" });
    });
});

router.get(`${walletPath}/trans:id?:coin?`, (req, res) => {
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
      wallet
        .send(params)
        .then(transaction => {
          console.dir(transaction);
          res.json(transaction);
        })
        .catch(error => {
          res.json({ error: "err" });
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
