var express = require('express');
var router = express.Router();
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var IPFSTools = require('../IPFS.js');

async function fileToHash(file) {
  var hash = await IPFSTools.send(file);
  return hash;
}

async function hashToFile(hash) {
  var image = await IPFSTools.retrieve(hash).then((res) => {
    return res
  });
  return image;
}

async function handleHashes(hashArray) {
  output = []
  var hashAsciiArray = hashArray.map(function(item) { return web3.utils.toAscii(item["interactionHash"]);})
  const imageArray = await Promise.all(
    hashAsciiArray.map(hashToFile)
  );

  hashArray.forEach(async(element, index) => {
    var dateTime = element['dateTime'];
    var isValid = element['isValid'];
    var hash = element['interactionHash'];
    var hashAscii = web3.utils.toAscii(hash);
    var image = imageArray[index]
    output.push({id : index, hash : hashAscii, image, dateTime, isValid})  
  })
  return output;
}

async function handleFeedback(feedbackArray) {
  output = []
  feedbackArray.forEach(async(element, index) => {
    var id = element['id']
    var text = element['text']
    var dateTime = element['dateTime']
    var owner = element['owner']
    var isValid = element['isValid']
    output.push({id,text,dateTime,owner,isValid})
  });
  return output;
}


router.get('/identity', cors(), async function(req,res,next) {
  var address = req.query.address.toString().toLowerCase();
  var mappedAddress = global.hardMap[address];
  await ecosystemInstance.methods.checkUserIdentity(mappedAddress).call({from : mappedAddress,  gas: 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : result})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
})



// registering of user
router.post('/register/user', cors(), async function(req, res, next) {
  var address = req.body.address;
  if (!web3.isAddress(address)) return;
  await ecosystemInstance.methods.registerIndividual().send({from : address, gas : 1000000})
  .then((result) => {
    // console.log(result)
    res.send({'success' : true, 'message' : `User ${address} has been successfully registered`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// registering of institution
router.post('/register/institution', cors(), async function(req, res, next) {
  var institution = req.body.institution;
  var user = req.body.user;
  if (!web3.isAddress(institution) || !web3.isAddress(user)) return;
  await ecosystemInstance.methods.registerInstitution(institution).send({from : user, gas : 1000000})
  .then((result) => {
    console.log(result)
    res.send({'success' : true, 'message' : `Institution ${address} has been successfully registered`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Retrieving of hash, available to public
router.get('/profile', cors(), async function(req, res, next) {
  var address = req.query.address;
  await ecosystemInstance.methods.getInteraction(address).call({from : address,  gas: 1000000})
  .then(async(result) => {
    if (result) {
      var output = await handleHashes(result)
      res.send({'success' : true, 'message' : output})
    } else {
      res.send({'success' : false, 'message' : `No Interactions found for user ${address}`})
    }
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});


// Posting of hash, only available for institutions
router.post('/hash', cors(), async function(req, res, next) {
  var file = req.body.file;
  // var hash = web3.utils.keccak256(file)
  var hash = await fileToHash(file);
  var hexedHash = web3.utils.asciiToHex(hash)
  var recipient = req.body.recipient;
  var institution = req.body.institution;
  var dateTime = Date.now()
  await ecosystemInstance.methods.addInteraction(hexedHash, dateTime, recipient).send({from : institution,  gas: 1000000})
  .then((result) => {
    console.log(result)
    res.send({'success' : true, 'message' : `${hash} has been successfully uploaded for recipient ${recipient}`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});


// Posting of feedback, available to public for now
// Should only be available to people who have worked in the company before
router.post('/feedback', cors(), async function(req, res, next) {
  var feedback = web3.utils.asciiToHex(req.body.feedback);
  var institution = req.body.institution;
  var user = req.body.user;
  var dateTime = Date.now()
  await ecosystemInstance.methods.addFeedback(feedback, dateTime, institution).send({from : user, gas : 1000000})
  .then((result) => {
    console.log(result)
    // confirm what results is
    res.send({'success' : true, 'message' : `${feedback} has been successfully uploaded for institution ${institution}`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Retrieving of feedback, available to public
router.get('/feedback', cors(), async function(req, res, next) {
  var address = req.query.address
  console.log(address);
  await ecosystemInstance.methods.getFeedback(address).call({from : address,  gas: 1000000})
  .then(async (result) => {
    if (!result.length) {
      res.send({'success' : false, 'message' : "Invalid address"})
    } else {
      var output = await handleFeedback(result)
      res.send({'success' : true, 'message' : output})  
    }
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});


module.exports = router;


