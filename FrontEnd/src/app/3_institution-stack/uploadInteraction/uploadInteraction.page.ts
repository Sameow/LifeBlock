import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../../7_services/interaction/interaction.service';
import { ValidationService } from '../../7_services/validation/validation.service';
import { ConversionService } from '../../7_services/conversion/conversion.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';

@Component({
  selector: 'app-uploadInteraction',
  templateUrl: 'uploadInteraction.page.html',
  styleUrls: ['uploadInteraction.page.scss']
})


export class UploadInteractionPage {
  image : string
  recipientAddress: string
  
  constructor (
    private route: Router, 
    private interactionService: InteractionService, 
    private validationService: ValidationService,
    private conversionService: ConversionService,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {

  }

  async validateAddress(address) {
    address = address.toLowerCase();
    this.recipientAddress = address;
    var boolean = this.validationService.validateAddress(address); 
    return boolean;
  }


  async handleClick() {
    var result = await this.validateAddress(this.recipientAddress);
    if (!result) {
      console.log("Input Address for recipient is not valid")
      alert("Input Address for recipient is not valid!")
    } else if (!this.image) {
      console.log("Please upload the interaction file!")
      alert("Please upload the interaction file!")
    } else {
      await this.uploadInteraction();
      // location.reload();
    }
    
  }

  async handleImage($event) {
    console.log("Handling image")
    var file = $event.target.files[0];
    var imageString = await this.conversionService.convertBase64(file);
    this.image = imageString.toString();
  }

  async uploadInteraction() {
    var address = await this.authenticationService.getUserAddress();
    await this.interactionService.addInteraction(this.image, this.recipientAddress, address);
  }
  

}
