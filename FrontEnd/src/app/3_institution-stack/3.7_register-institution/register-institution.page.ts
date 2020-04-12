import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../7_services/register/register.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
import { IdentificationService } from '../../7_services/identification/identification.service';
import { ValidationService } from '../../7_services/validation/validation.service';

@Component({
  selector: 'app-register-institution',
  templateUrl: 'register-institution.page.html',
  styleUrls: ['register-institution.page.scss']
})


export class RegisterInstitutionPage implements OnInit {
    newInstitutionName : string
    newInstitutionAddress : string
    
    constructor(
      private registerService : RegisterService,
      private authenticationService : AuthenticationService,
      private identificationService : IdentificationService,
      private validationService : ValidationService
      ) { }
  
    ngOnInit() {
    
    }

    onInstitutionNameChange(name) {
      this.newInstitutionName = name;
    }
  
    onInstitutionAddressChange(address) {
      this.newInstitutionAddress = address;
    }

    async validateName(name) {
      return this.validationService.validateText(name);
    }
  
    async validateAddress(address) {
        return this.validationService.validateAddress(address);
    }

    async registerInstitution() {
      // checks if name is valid
      if (!await this.validateName(this.newInstitutionName)) {
        alert("Invalid Name, please check again!")
        return;
      }
      // checks if the input address is valid 
      if (!await this.validateAddress(this.newInstitutionAddress)) {
        alert("Invalid Address, please check again!")     
        return;
      }
      // checks if input address is unregistered
      var identity = await this.identificationService.fetchOtherIdentity(this.newInstitutionAddress);
      if (identity != 0) {
        alert(`Address is already registered as ${identity}!`);
        return;
      }
      var userAddress = this.authenticationService.getUserAddress();
      var result = await this.registerService.registerInstitution(this.newInstitutionAddress, userAddress, this.newInstitutionName)
      if (result) {
        (document.getElementById("institution-address-input") as HTMLInputElement).value = "";
        (document.getElementById("institution-name-input") as HTMLInputElement).value = "";
        alert(`Successfully registered institution ${this.newInstitutionAddress}`);
      } else {
        alert("Something went wrong, please try again")
      }
    }


}