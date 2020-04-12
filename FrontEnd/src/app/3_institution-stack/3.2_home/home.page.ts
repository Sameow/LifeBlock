import { Component } from '@angular/core';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
import { IdentificationService } from '../../7_services/identification/identification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  feedbacks : Feedback[] = []
  name : string
  address : string
  
  constructor(
    private feedbackService : FeedbackService,
    private authenticationService : AuthenticationService,
    private identificationService : IdentificationService
    ) {}

  async ngOnInit() {
    this.address = this.authenticationService.getUserAddress();
    this.name = await this.identificationService.getUserName();
    await this.retrieveAllFeedback(this.address);
  }

  async retrieveAllFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllFeedback(address);
  }

  async doRefresh(refresher) {
    await this.retrieveAllFeedback(this.address).then(() => {
      refresher.target.complete();
    })
  }

}