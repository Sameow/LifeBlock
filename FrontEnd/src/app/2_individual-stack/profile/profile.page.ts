import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Interaction } from '../../7_services/interaction/interaction.model';
import { InteractionService } from '../../7_services/interaction/interaction.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {
  address : string
  interactions: Interaction[] = []

  constructor(
    private interactionService: InteractionService,
    private alertController: AlertController,
    private authenticationService : AuthenticationService
    ) {}

  async ngOnInit() {
    this.address = await this.authenticationService.getUserAddress();
    await this.retrieveAllInteractions(this.address);
  }

  async retrieveAllInteractions(address : string) {
    this.interactions = await this.interactionService.retrieveAllInteractions(address);
  }
  
  handleImage(interaction) {
    console.log('bringing up modal')
  }

  async handleInvalidate(item) {
    await this.presentAlertConfirm(item, this.address);
  }


  async presentAlertConfirm(item, address) {
    const alert = await this.alertController.create({
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
            await this.interactionService.invalidateInteraction(item.hash, this.address);
          }
        }
      ]
    });
    await alert.present();
  }
}