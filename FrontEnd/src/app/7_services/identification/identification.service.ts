import { Injectable } from '@angular/core';
import Config from '../../env.js'

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private userIdentity : number
  private userName : string
  private targetIdentity : number
  
  constructor() { }

  getUserName() {
    return this.userName;
  }

  getIdentity() {
    return this.userIdentity;
  }

  async fetchIdentity(address : string) {
    await this._checkIdentity(address);
    return this.userIdentity;
  }

  async fetchOtherIdentity(address : string) {
    await this._checkOtherIdentity(address);
    return this.targetIdentity;
  }

  // Checks the identity of user
  private async _checkIdentity(address : string) {
    address = address.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/identity?address=' + [address], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async (res) => {
        if (res.success) {
          this.userIdentity = res.message
          await this._retrieveName(address);
        } else {
          console.log(res.message);
        }
      });
  }

  // Checks the identity of the given address
  private async _checkOtherIdentity(address : string) {
    address = address.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/identity?address=' + [address], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async (res) => {
        if (res.success) {
          this.targetIdentity = res.message
        } else {
          console.log(res.message);
        }
      });
  }

  private async _retrieveName(address : string) {
    address = address.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/name?address=' + [address], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        if (res.success) {
          this.userName = res.message
        } else {
          console.log(res.message)
        }
      });
  }


}
