import { Injectable } from '@angular/core';
import Config from '../../env.js'

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private userIdentity : number

  constructor() { }

  getIdentity() {
    return this.userIdentity;
  }

  async fetchIdentity(address : string) {
    await this.checkIdentity(address);
    return this.userIdentity;
  }

  async checkIdentity(address : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/identity?address=' + [address], {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        this.userIdentity = res.message
      });
  }

}
