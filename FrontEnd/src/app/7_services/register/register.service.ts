import { Injectable } from '@angular/core';
import Config from '../../env.js'

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  registerUserSuccess : boolean = false;
  registerInstitutionSuccess : boolean = false;
  registerCaSuccess : boolean = false;

  constructor() { }

  async registerUser(address : string) {
    await this._registerUser(address);
    return this.registerUserSuccess;
  }

  async registerInstitution(institution : string, user : string, institutionName : string) {
    await this._registerInstitution(institution, user, institutionName);
    return this.registerInstitutionSuccess;
  }

  async registerCA(institution : string, user : string) {
    await this._registerCA(institution, user);
    return this.registerCaSuccess;
  }

  private async _registerUser(address : string) {
    var name = "LifeBlocker"
    await fetch(Config.IP_ADDRESS + '/truffle/register/user', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              address: address,
              name : name
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        this.registerUserSuccess = res.success;
      })
  }

  private async _registerInstitution(institution : string, user : string, institutionName : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/register/institution', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            institution: institution,
            user : user,
            institutionName : institutionName
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        this.registerInstitutionSuccess = res.success;
      })
  }

  private async _registerCA(institution : string, user : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/approve', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            institution: institution,
            user : user,
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        this.registerCaSuccess = res.success;
      })
  }

    
  
}
