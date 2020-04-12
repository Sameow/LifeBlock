var express = require('express');
var router = express.Router();
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var IPFSTools = require('../IPFS.js');

// Put file onto IPFS network
async function fileToHash(file) {
  var hash = await IPFSTools.send(file);
  return hash;
}

// Retrieves file from IPFS network
async function hashToFile(hash) {
  var image = await IPFSTools.retrieve(hash).then((res) => {
    return res
  });
  return image;
}

// Transform data into the required format to send frontend
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
    var issuer = element['issuer']
    var recipient = element['recipient']
    output.push({id : index, hash : hashAscii, image, dateTime, issuer, recipient, isValid})  
  })
  return output;
}

// Transform data into the required format to send frontend
async function handleFeedback(feedbackArray) {
  output = []
  feedbackArray.forEach(async(element) => {
    var id = element['id']
    var text = web3.utils.hexToAscii(element['text'])
    var dateTime = element['dateTime']
    var issuer = element['issuer']
    var recipient = element['recipient']
    var isValid = element['isValid']
    output.push({id, text, dateTime, issuer, recipient, isValid})
  });
  return output;
}

// Retrieves the identity of user (unregistered, individual, institution, contract owner)
router.get('/identity', cors(), async function(req,res,next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }    
  await ecosystemInstance.methods.checkUserIdentity(address).call({from : address,  gas: 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : result})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
})

// Retrieves the name of user
router.get('/name', cors(), async function(req,res,next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.getName(address).call({from : address,  gas: 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : web3.utils.hexToAscii(result)})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
})

// Register address as individual
router.post('/register/user', cors(), async function(req, res, next) {
  var address = req.body.address;
  address = global.hardMap[address];
  var name = web3.utils.asciiToHex(req.body.name);
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.registerIndividual(name).send({from : address, gas : 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : `User ${address} has been successfully registered`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Register address as institution
router.post('/register/institution', cors(), async function(req, res, next) {
  var institution = req.body.institution;
  var user = req.body.user;
  var institutionName = web3.utils.asciiToHex(req.body.institutionName);
  institution = global.hardMap[institution];
  user = global.hardMap[user];
  if (!web3.utils.isAddress(institution) || !web3.utils.isAddress(user)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }    
  await ecosystemInstance.methods.registerInstitution(institution, institutionName).send({from : user, gas : 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : `Institution ${institutionName} has been successfully registered`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Approve registered institutions as CA
router.post('/approve', cors(), async function(req, res, next) {
  var institution = req.body.institution;
  var user = req.body.user;
  institution = global.hardMap[institution];
  user = global.hardMap[user];
  if (!web3.utils.isAddress(institution) || !web3.utils.isAddress(user)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }    
  await ecosystemInstance.methods.approveCA(institution).send({from : user, gas : 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : `Institution ${institution} has been successfully approved as CA`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Retrieving of hashes for a individual
router.get('/profile', cors(), async function(req, res, next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }    
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

// Retrieving of hashes uploaded by a particular institution
router.get('/hash', cors(), async function(req, res, next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.getUploadedInteraction().call({from : address, gas : 1000000})
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
})

// Uploading of hash (only available for institutions)
router.post('/hash', cors(), async function(req, res, next) {
  var file = req.body.file;
  var hash = await fileToHash(file);
  var hexedHash = web3.utils.asciiToHex(hash)
  var dateTime = Date.now()
  var recipient = req.body.recipient;
  var institution = req.body.institution;
  recipient = global.hardMap[recipient];
  institution = global.hardMap[institution];
  if (!web3.utils.isAddress(recipient) || !web3.utils.isAddress(institution)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }    
  await ecosystemInstance.methods.addInteraction(hexedHash, dateTime, recipient).send({from : institution,  gas: 1000000})
  .then((result) => {
    console.log(result)
    res.send({'success' : true, 'message' : `${hash} has been successfully uploaded for recipient ${recipient}`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Invalidation of hash, only available for institutions who issued the interaction, or individuals who owned the interaction
router.post('/invalidate/hash', cors(), async function(req, res, next) {
  var hash = req.body.hash;
  hash = web3.utils.asciiToHex(hash)
  var recipient = req.body.recipient;
  var from = req.body.from;
  from = global.hardMap[from];
  if (!web3.utils.isAddress(recipient) || !web3.utils.isAddress(from)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.invalidateInteraction(hash, recipient).send({from : from,  gas: 1000000})
  .then((result) => {
    if (result.status) {
      res.send({'success' : true, 'message' : `${hash} has been invalidated for user ${recipient}`})
    } else {
      res.send({'success' : false, 'message' : `Something went wrong please try again`})
    }
  })
  .catch((err) => {
    console.log(err)
    res.send({'success' : false, 'message' : err})
  })
});

// Posting of feedback
router.post('/feedback', cors(), async function(req, res, next) {
  var feedback = web3.utils.asciiToHex(req.body.feedback);
  var institution = req.body.institution;
  var user = req.body.user;
  var dateTime = Date.now()
  user = global.hardMap[user];
  institution = global.hardMap[institution];
  if (!web3.utils.isAddress(user) || !web3.utils.isAddress(institution)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.addFeedback(feedback, dateTime, institution).send({from : user, gas : 1000000})
  .then((result) => {
    res.send({'success' : true, 'message' : `${feedback} has been successfully uploaded for institution ${institution}`})
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

// Retrieving of feedback of an institution
router.get('/feedback', cors(), async function(req, res, next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
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

// Retrieving of feedback added by individual
router.get('/feedback/individual', cors(), async function(req, res, next) {
  var address = req.query.address;
  address = global.hardMap[address];
  if (!web3.utils.isAddress(address)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.getAddedFeedback().call({from : address,  gas: 1000000})
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

// Invalidation of feedback, available to feedback owners
router.post('/feedback/invalidate', cors(), async function(req, res, next) {
  var feedbackID = req.body.feedbackID;
  var institution = req.body.institution;
  var user = req.body.user;
  user = global.hardMap[user];
  if (!web3.utils.isAddress(user) || !web3.utils.isAddress(institution)) {
    res.send({'success' : false, 'message' : `Checksum for address is incorrect`});
    return;
  }
  await ecosystemInstance.methods.invalidateFeedback(web3.utils.toBN(feedbackID), institution).send({from : user,  gas: 1000000})
  .then(async (result) => {
    if (result.status) {
      res.send({'success' : true, 'message' : `${feedbackID} has been invalidated for institution ${institution}`})
    } else {
      res.send({'success' : false, 'message' : `Something went wrong please try again`})
    }
  })
  .catch((err) => {
    res.send({'success' : false, 'message' : err})
  })
});

module.exports = router;


