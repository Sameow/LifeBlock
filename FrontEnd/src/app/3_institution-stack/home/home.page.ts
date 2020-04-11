import { Component } from '@angular/core';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  feedbacks : Feedback[] = []
  constructor(
    private feedbackService : FeedbackService,
    private authenticationService : AuthenticationService
    ) {}

  ngOnInit() {
    // should be dynamic retrieve when metamask is up
    var address = this.authenticationService.getUserAddress();
    this.retrieveAllFeedback(address);
  }

  async retrieveAllFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllFeedback(address);
  }

}