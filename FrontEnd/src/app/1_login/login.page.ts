import { Component, OnInit, Inject, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { IdentificationService } from '../7_services/identification/identification.service';
import { AuthenticationService } from '../7_services/authentication/authentication.service';
import { RegisterService } from '../7_services/register/register.service';
import Web3 from 'web3';
import { WEB3 } from '../web3'
// import { provider } from 'web3-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userAddress : string = ""
  constructor(
    @Inject(WEB3) private web3: Web3,
    private route: Router, 
    private identificationService: IdentificationService,
    private authenticationService: AuthenticationService,
    private registerService : RegisterService
    ) {}
    
  ngOnInit() {
  }

  async handleClick() {
    var address = await this.metaMaskInjection();
    this.userAddress = address;
    var challenge = await this.generateChallenge(address);
    var signature = await this.signChallenge(challenge, address);
    var message = challenge[1]['value']
    var result = await this.sendChallenge(message, signature);
    if (!result) {alert("Authentication failed, please try again!");return;} 
    var identity = await this.identificationService.fetchIdentity(address);
    this.handleIdentity(identity);
  }

  async metaMaskInjection() {
    var provider : Object = this.web3.currentProvider;
    if ('enable' in provider) {
      try {
        await this.web3.currentProvider.enable();
      } catch(err) {
        alert(err)
      }
    }
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0].toLowerCase();
  }

  async generateChallenge(address : string) {
    var challengeObject = await this.authenticationService.generateChallenge(address);
    return challengeObject;
  }

  async signChallenge(challenge : Object[], address : string) {
    const from = address;
    const params = [challenge, from];
    const method = 'eth_signTypedData';
    const provider = this.web3.currentProvider;
    return new Promise<string>(function(resolve, reject) {
      let output : string;
      try {
        provider.sendAsync({ method, params, from }, async (err, result) => {
          if (err) {
            output = err
            reject(output)
          }
          if (result.error) {
            output = result.error
            reject(output)
          }
          output = result.result
          resolve(output)
        })  
      } catch (err) {
        alert(err)
        reject(err)
        console.log(err)
      }
    });
  } 
  async sendChallenge(message : string, signature : string) {
    var result : boolean = await this.authenticationService.authenticateUser(message, signature);
    return result;
  }

  // 1 represents registered individual
  // 2 represents registered institutions
  // 3 represents contract owner
  // else (0) represents new user
  async handleIdentity(identity : number) {
    if (identity == 2) {
      this.route.navigate(['/institution']);
    } else if (identity == 3) {
      this.route.navigate(['/owner']);
    } else {
      if (identity == 0) {
        this.registerService.registerUser(this.userAddress);
      }
      this.route.navigate(['/individual']);
    }
  }
}