const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var _ = require('underscore');
const IPFSTools = require('./IPFS.js');

// var fs = require('fs');

// var imageAsBase64 = fs.readFileSync('./images/test.jpg').toString('base64');
// imageAsBase64 = `data:image/jpg;base64,${imageAsBase64}`;

// Contract deployment -- Only used during development 

// DEFAULT 
// ACCOUNTS[0] == contractOwner
// ACCOUNTS[1] == user1 (Bob)
// ACCOUNTS[2] == user2 (Peter)
// ACCOUNTS[3] == user3 (James)
// ACCOUNTS[4] == institution1 (Facebook)
// ACCOUNTS[5] == institution1 (Amazon)
// ACCOUNTS[6] == institution1 (Apple)
// ACCOUNTS[7] == institution1 (Netflix)
// ACCOUNTS[8] == institution1 (Google)

// ***********The following contains a hard map of the 10 dummy accounts *********************
// Change the address accordingly to assume different roles in the network
// *NOTE* YOUR ADDRESS SHOULD BE UNIQUE, FUNCTIONS ARE NOT IMPLEMENTED TO HANDLE NON UNIQUE ADDRESSES;
let hardMap = {}

async function mapAddresses(accounts) {
    hardMap = {
        '0x792fc0d05ad353a86f8f22b524e57f090b27ea14' : accounts[0],
        '0x1f15d5e91772335a5e247865cf694b744099fafc' : accounts[1],
        '0x2192e76c85648edcdef826c07c9464788747c326' : accounts[2],
        '0x0000000000000000000000000000000000000004' : accounts[3],
        '0xa0ce3bdd2615fe4959e6fdf30955d73924da2e7c' : accounts[4],
        '0x109f0ce02e4813c2ea72b1584bbc3e5fa7ce24f2' : accounts[5],
        '0x0000000000000000000000000000000000000007' : accounts[6],
        '0x0000000000000000000000000000000000000008' : accounts[7],
        '0x0000000000000000000000000000000000000009' : accounts[8],
        '0x0000000000000000000000000000000000000010' : accounts[9]
    }
    global.hardMap = hardMap
}
// *******************************************************************

var EcosystemJSON = require("./build/contracts/BlockEcosystem.json");
let abi = EcosystemJSON.abi;

let EcosystemContract = new web3.eth.Contract(abi);
EcosystemContract.options.data =  EcosystemJSON.bytecode;

let addressCount = 0;
let institutions = [];
let users = [];

const institutionsList = ["Facebook","Amazon","Apple","Netflix","Google"]
const userList = ["Bob","Peter","James"]

function generateRandom(b) {
    return Math.floor((Math.random() * b));
}

async function parseUsers() {
    for (j in userList) {
        addressCount++;
        var ethAddress = accounts[addressCount];
        users.push({'accountID': addressCount, 'userName' : userList[j], 'ethAddress' : ethAddress })
    }
}

async function parseInstitutions () {
    for (i in institutionsList) {
        addressCount++;
        var ethAddress = accounts[addressCount];
        institutions.push({'accountID': addressCount,'institutionName' : institutionsList[i], 'ethAddress' : ethAddress});    
    }
}

function toBytes(stringInput) {
    var utf8 = unescape(encodeURIComponent(stringInput));

    var arr = [];
    for (var i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return arr
}


async function registerStakeholders () {
    console.log("Registering various stakeholders");
    // Register all users
    for (var user of users) {
        console.log(`Registering ${user['userName']} at ${user['ethAddress']}`);
        await ecosystemInstance.methods.registerIndividual(toBytes(user['userName'])).send({from : user['ethAddress'], gas : 1000000});
    }
    // Register all institutions
    for (var institution of institutions) {
        console.log(`Registering ${institution['institutionName']} at ${institution['ethAddress']}`);
        await ecosystemInstance.methods.registerInstitution(institution['ethAddress'], toBytes(institution['institutionName'])).send({from : contractOwner, gas : 1000000});
    }
}

async function fillData() {
    for (i in institutions) {
        for (k in users) {
            numberInteractions = 1 + generateRandom(5);
            for (var j = 0; j < numberInteractions; j++) {
                var timestamp = Date.now()
                // console.log(imageAsBase64);
                var IPFSHash = await IPFSTools.send(imageAsBase64)
                console.log(`IPFS Hash is ${IPFSHash}`);
                var randomHash = web3.utils.asciiToHex(IPFSHash)
                console.log(`Hash is ${randomHash}`)
                // var randomHash = web3.utils.asciiToHex(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20));
                var feedBack = web3.utils.asciiToHex(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20));
                console.log(`Adding Interaction ${randomHash} from ${institutions[i]['institutionName']} to ${users[k]['userName']}`)
                await ecosystemInstance.methods.addInteraction(randomHash, timestamp, users[k]['ethAddress']).send({from : institutions[i]['ethAddress'], gas : 1000000});
                console.log(`Adding Feedback ${feedBack} from ${users[k]['userName']} to ${institutions[i]['institutionName']}`)
                await ecosystemInstance.methods.addFeedback(feedBack, timestamp, institutions[i]['ethAddress']).send({from : users[k]['ethAddress'], gas : 1000000})
            }
            // break;
        }
        // break;
    }
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
            await parseUsers();
            await parseInstitutions();
            await registerStakeholders();
            // await fillData();
            //await IPFS.setup();
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