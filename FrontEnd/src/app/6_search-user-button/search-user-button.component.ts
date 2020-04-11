import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../7_services/validation/validation.service';
import { Interaction } from '../7_services/interaction/interaction.model';
import { InteractionService } from '../7_services/interaction/interaction.service';
import { AuthenticationService } from '../7_services/authentication/authentication.service';
import { IdentificationService } from '../7_services/identification/identification.service';


@Component({
  selector: 'app-search-user-button',
  templateUrl: './search-user-button.component.html',
  styleUrls: ['./search-user-button.component.scss'],
})
export class SearchUserButtonComponent implements OnInit {
  address : string
  isValid : boolean
  interactions: Interaction[] = []

  constructor(
    private validationService: ValidationService, 
    private interactionService : InteractionService,
    private authenticationService : AuthenticationService,
    private identificationService : IdentificationService
    ) {}

  ngOnInit() {}

  validateInput(address) {
    this.address = address
    this.isValid = this.validationService.validateAddress(address);
  }

  async handleClick() {
    if (!this.isValid) {
      alert("Input Address is not valid, please check and try again");
    } else {
      this.interactions = await this.interactionService.retrieveAllInteractions(this.address);      
    }
  }

  getUserIdentity() {
    return this.identificationService.getIdentity();
  }

  getUserAddress() {
    return this.authenticationService.getUserAddress();
  }

}
