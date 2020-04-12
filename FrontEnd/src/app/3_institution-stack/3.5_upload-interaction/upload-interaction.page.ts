import { Component } from '@angular/core';
import { InteractionService } from '../../7_services/interaction/interaction.service';
import { ValidationService } from '../../7_services/validation/validation.service';
import { ConversionService } from '../../7_services/conversion/conversion.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';

@Component({
  selector: 'app-upload-interaction',
  templateUrl: 'upload-interaction.page.html',
  styleUrls: ['upload-interaction.page.scss']
})


export class UploadInteractionPage {
  image : string
  recipientAddress: string
  
  constructor (
    private interactionService: InteractionService, 
    private validationService: ValidationService,
    private conversionService: ConversionService,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {

  }

  async handleAddressChange(address) {
    address = address.toLowerCase();
    this.recipientAddress = address;
  }

  async validateAddress(address) {
    return this.validationService.validateAddress(address); 
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
    }
  }

  async handleImage($event) {
    var file = $event.target.files[0];
    var imageString = await this.conversionService.convertBase64(file);
    this.image = imageString.toString();
  }

  async uploadInteraction() {
    var address = await this.authenticationService.getUserAddress();
    var res = await this.interactionService.addInteraction(this.image, this.recipientAddress, address)
    if (res['success']) {
      (document.getElementById("address-input") as HTMLInputElement).value = "";
      (document.getElementById("file-input") as HTMLInputElement).value = "";      
      alert(`Interaction has been successfully uploaded for ${this.recipientAddress}!`)
    } else {
      alert(`Failed to upload interaction, please try again!`)
    }
  }
  

}
