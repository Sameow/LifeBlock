import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../7_services/register/register.service';
import { AuthenticationService } from '../7_services/authentication/authentication.service';

@Component({
    selector: 'app-approve-institution-button',
    templateUrl: './approve-institution-button.component.html',
    styleUrls: ['./approve-institution-button.component.scss'],
  })

export class ApproveInstitutionButtonComponent implements OnInit {
    newInstitutionAddress: string
    constructor (
        private route: Router, 
        private registerService: RegisterService,
        private authenticationService: AuthenticationService
        ) { }
  
    ngOnInit() {
  
    }
    
    async validateAddress(address) {
        this.newInstitutionAddress = address
    }

    async approveInstitution() {
        var userAddress = this.authenticationService.getUserAddress();
        var successful = await this.registerService.registerInstitution(this.newInstitutionAddress, userAddress)
        console.log(successful)
    }

}