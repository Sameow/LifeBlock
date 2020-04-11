import { Injectable } from '@angular/core';
import Config from '../../env.js'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  generatedChallenge : Object[] = [];
  isAuthenticated : boolean = false;
  private userAddress : string;

  constructor() { }

  getUserAddress() {
    return this.userAddress;
  }

  async generateChallenge(address : string) {
    await this._retrieveChallenge(address);
    return this.generatedChallenge;
  }

  async authenticateUser(message : string, signature : string) {
    await this._authenticateUser(message, signature);
    return this.isAuthenticated;
  }

  private async _retrieveChallenge(address : string) {
    await fetch(Config.IP_ADDRESS + '/auth/metaMask/' + [address], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        if (res.success) {
          this.generatedChallenge = res.msg
        } else {
          alert("Failed to receive challenge message!")
        }
      });
  }

  private async _authenticateUser(message : string, signature : string) {
    await fetch(Config.IP_ADDRESS + '/auth/metaMask/' + [message] + "/" + [signature], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        if (res.success) {
          this.userAddress = res.message.toLowerCase();
          this.isAuthenticated = true;
        }
    });
  }



}
