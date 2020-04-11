const IPFS = require('ipfs');
const request = require('request');

async function send(image) {
    let IPFSnode = global.IPFS
    for await (const file of IPFSnode.add(image)) {
        return file.path
    }    
}

async function retrieve(hash) {
    console.log(`Retrieving hash of ${hash}`)
    return new Promise(function(resolve, reject) {
        request('https://gateway.ipfs.io/ipfs/' + [hash], { json: true }, (err, res, body) => {
            if (err) { 
                reject(err); 
            }
            resolve(body)
          });      
        })
}

async function createIPFS () {
    var IPFSNode = await IPFS.create();
    return IPFSNode;
}

module.exports = {
    createIPFS : function () {
        return createIPFS();
    },
    retrieve : async function (hash) {
        return await retrieve(hash);
    },
    send : async function (hash) {
        return await send(hash);
    }
  };