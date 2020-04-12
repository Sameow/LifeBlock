const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
// Contract deployment -- Only used during development 

// ***********The following contains a hard map of the 10 dummy accounts *********************
// Replace the addresses with your own to assume different roles in the network
// *NOTE* YOUR ADDRESS SHOULD BE UNIQUE, FUNCTIONS ARE NOT IMPLEMENTED TO HANDLE NON UNIQUE ADDRESSES;
// DEFAULT 
// ACCOUNTS[0] == contractOwner
let hardMap = {}  
async function mapAddresses(accounts) {
    hardMap = {
        '0xc3b0ccf1f598201649cc4374900fee7090d128cd' : accounts[0],
        '0x1f15d5e91772335a5e247865cf694b744099fafc' : accounts[1],
        '0x109f0ce02e4813c2ea72b1584bbc3e5fa7ce24f2' : accounts[2],
        '0xccaaf1d70ecc5e4e76316d47a7fc7bd2b00af10f' : accounts[3],
        '0xe7f66fe2f12dad73eede65b53c4a0d48cc1a01a9' : accounts[4],
        '0x0000000000000000000000000000000000000006' : accounts[5],
        '0x0000000000000000000000000000000000000007' : accounts[6],
        '0x0000000000000000000000000000000000000008' : accounts[7],
        '0x0000000000000000000000000000000000000009' : accounts[8],
        '0x0000000000000000000000000000000000000010' : accounts[9]
    }

    reverseMap = reverseObject(hardMap)
    global.hardMap = hardMap
    global.reverseMap = reverseMap
}
// *******************************************************************

var EcosystemJSON = require("./build/contracts/BlockEcosystem.json");
let abi = EcosystemJSON.abi;

let EcosystemContract = new web3.eth.Contract(abi);
EcosystemContract.options.data =  EcosystemJSON.bytecode;

function reverseObject(object) {
    var newObject = {};

    for (var key in object) {
        var value = object[key]
        newObject[value] = key
    }
    return newObject;
  }

async function startNetwork () {
    web3.eth.getAccounts()
    .then(async function(result){ 
        global.accounts = result;
        await mapAddresses(result);
        global.contractOwner = result[0];
        EcosystemContract.deploy().send({from: accounts[0], gas: 20000000})
        .then(async function(ecosystemInstance){
            global.ecosystemInstance = ecosystemInstance;
            console.log(`Ecosystem Contract has been deployed at : ${ecosystemInstance.options.address} by ${accounts[0]}`);
            })
    .catch(function(error) {
      console.log(error)
        })    
    });
}

module.exports = {
    startNetwork : async function () {
        startNetwork();
    }
  };