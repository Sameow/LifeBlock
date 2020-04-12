# IS4302 Project 

### Setting up of Login

Ensure that you have metamask plugin install on your browser.

Go the development.js (BackEnd/development.js) and change the address in accounts[0] to your own address.  You would now the the owner of the contract.


Test case 1: Using BlockLife as an institution

As the owner, first log into BlockLife, then register the institution's address, using the "Register Institution" form.

If you would like this institution to be a CA as well, please do so, using the "Register CA" form.

Now, switch your metamask address to the registered institution's address, and log in as an institution.


Test case 2: Using BlockLife as an individual

Simply log in using any metamask address, that has not been registered as an institution or contract owner.


### Setting up of truffle development 

###### Installing the required pakages globally
npm install -g truffle
<br>
npm install -g ganache-cli
<br>
Once done, run the following command to deploy blockchain server (default at 127.0.0.1:8545)
<br>
ganache-cli --seed IS4302 -e 10000000000000 -l 80000000  // do not close
###### Go to the TruffleNetwork folder
cd BackEnd
npm install @openzeppelin/contracts // to download and install dependencies

truffle migrate // to compile and deploy the contracts on the server



### Setting up of BackEnd

###### Go to the BackEnd folder and install the required packages (Express server will be deployed at port 3000)
cd BackEnd && npm install
<br>
nodemon www // do not close


### Setting up of FrontEnd

###### Go to the FrontEnd folder and install the required packages (Deployed at http://localhost:8100/)
cd FrontEnd && npm install
<br>
npm i @angular-devkit/build-angular@0.803.24 //to avoid an error

ionic serve // do not close
