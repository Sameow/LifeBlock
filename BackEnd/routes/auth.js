var express = require('express');
var router = express.Router();
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth({
    signature: 'MetaSignature',
    message: 'MetaMessage',
    address: 'MetaAddress',
    banner: 'Welcome to LifeBlock'
    }
    );

router.get('/metaMask/:MetaAddress', metaAuth, cors(),(req, res) => {
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send({"success":true,"msg":req.metaAuth.challenge})
  }
});

router.get('/metaMask/:MetaMessage/:MetaSignature', metaAuth, cors(), (req, res) => {
    if (req.metaAuth && req.metaAuth.recovered) {
        res.send({"success": true, "message" :req.metaAuth.recovered});
      } else {
        res.send({"success" : false, "message" : "Invalid signature!"});
      };
});

module.exports = router;


