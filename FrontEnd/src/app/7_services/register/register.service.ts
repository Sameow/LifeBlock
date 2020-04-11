import { Injectable } from '@angular/core';
import Config from '../../env.js'

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  registerUserSuccess : boolean = false;
  registerInstitutionSuccess : boolean = false;

  constructor() { }

  async registerUser(address : string) {
    await this._registerUser(address);
    return this.registerUserSuccess;
  }

  async registerInstitution(institution : string, user : string) {
    await this._registerInstitution(institution, user);
    return this.registerInstitutionSuccess;
  }

  private async _registerUser(address : string) {
    var name = "Bob"
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
        console.log(res);
        this.registerUserSuccess = true;
      })
  }

  private async _registerInstitution(institution : string, user : string) {
    var institutionName = "Google"
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
        this.registerInstitutionSuccess = true;
      })
  }



    
  
}
