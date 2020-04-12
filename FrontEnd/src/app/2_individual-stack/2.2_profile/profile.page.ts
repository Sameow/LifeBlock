import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Interaction } from '../../7_services/interaction/interaction.model';
import { InteractionService } from '../../7_services/interaction/interaction.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
import { IdentificationService } from '../../7_services/identification/identification.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {
  name : string
  address : string
  interactions: Interaction[] = []

  constructor(
    private interactionService: InteractionService,
    private alertController: AlertController,
    private authenticationService : AuthenticationService,
    private identificationService : IdentificationService
    ) {}

  async ngOnInit() {
    this.name = await this.identificationService.getUserName();
    this.address = await this.authenticationService.getUserAddress();
    await this.retrieveAllInteractions(this.address);
  }

  
  async doRefresh(refresher) {
    await this.retrieveAllInteractions(this.address).then(() => {
      refresher.target.complete();
    })
  }

  async retrieveAllInteractions(address : string) {
    this.interactions = await this.interactionService.retrieveAllInteractions(address);
  }
  
  handleImage(interaction) {
    console.log('bringing up modal')
  }

  async handleInvalidate(item) {
    await this.presentAlertConfirm(item);
  }


  async presentAlertConfirm(item) {
    const alert_prompt = await this.alertController.create({
      header: 'Are you sure you wish to invalidate this certificate?',
      message: 'This process is irreversible!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {            
          }
        }, {
          text: 'Okay',
          handler: async () => {
            var res = await this.interactionService.invalidateInteraction(item.hash, item.recipient, this.address);
            if (res['success']) {
              alert(`Interaction ${item.hash} has been successfully invalidated, refresh to see updated content`);
            } else {
              alert(`Failed to upload interaction, please try again!`);
            }
          }
        }
      ]
    });
    await alert_prompt.present();
  }

}