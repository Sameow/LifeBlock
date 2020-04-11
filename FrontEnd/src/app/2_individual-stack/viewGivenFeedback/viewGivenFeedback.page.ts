import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
@Component({
  selector: 'app-viewGivenFeedback',
  templateUrl: 'viewGivenFeedback.page.html',
  styleUrls: ['viewGivenFeedback.page.scss']
})


export class ViewGivenFeedbackPage implements OnInit {
  address : string
  feedbackText : string
  feedbacks: Feedback[] = []
  institutionAddress: string
  
  constructor(
    private route: Router, 
    private feedbackService: FeedbackService, 
    private alertController: AlertController,
    private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {}

  async load(){
    this.address = await this.authenticationService.getUserAddress();
    console.log(this.address);
    await this.retrieveAllGivenFeedback(this.address);
  }

  async retrieveAllGivenFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllGivenFeedback(address);
    console.log(this.feedbacks);
  }

  async handleInvalidate(item) {
    await this.presentAlertConfirm(item, this.address);
  }


  async presentAlertConfirm(item, address) {
    const alert = await this.alertController.create({
      header: 'Are you sure you wish to invalidate this feedback?',
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
            await this.feedbackService.deleteFeedback(item.id, this.address, item.issuee);
          }
        }
      ]
    });
    await alert.present();
  }
  
}
