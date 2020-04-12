import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
@Component({
  selector: 'app-view-history',
  templateUrl: 'view-history.page.html',
  styleUrls: ['view-history.page.scss']
})


export class ViewHistoryPage implements OnInit {
  address : string
  feedbackText : string
  feedbacks: Feedback[] = []
  institutionAddress: string
  
  constructor(
    private feedbackService: FeedbackService, 
    private alertController: AlertController,
    private authenticationService: AuthenticationService
    ) { }

  async ngOnInit() {
    this.address = this.authenticationService.getUserAddress();
    await this.retrieveAllGivenFeedback(this.address);
  }

  async doRefresh(refresher) {
    await this.retrieveAllGivenFeedback(this.address).then(() => {
      refresher.target.complete();
    })
  }

  async retrieveAllGivenFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllGivenFeedback(address);
  }

  async handleInvalidate(item) {
    await this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item) {
    const alert_prompt = await this.alertController.create({
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
            var res = await this.feedbackService.invalidateFeedback(item.id, this.address, item.recipient);
            if (res['success']) {
              alert(`Feedback ${item.id} has been successfully invalidated, refresh to see updated content`);
            } else {
              alert(`Failed to invalidate feedback, please try again!`);
            }

          }
        }
      ]
    });
    await alert_prompt.present();
  }
  
}
