import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { ValidationService } from '../../7_services/validation/validation.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
@Component({
  selector: 'app-submitFeedback',
  templateUrl: 'submitFeedback.page.html',
  styleUrls: ['submitFeedback.page.scss']
})


export class SubmitFeedbackPage implements OnInit {
  feedbackText : string
  feedback: Feedback
  institutionAddress: string
  
  constructor(
    private route: Router, 
    private feedbackService: FeedbackService, 
    private validationService: ValidationService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {

  }

  handleFeedback(value) {
    this.feedbackText = value;
  }
  
  handleAddress(address) {
    this.institutionAddress = address;
  }

  validateAddress() {
    var result = this.validationService.validateAddress(this.institutionAddress) 
    // console.log(result)
    return result;
  }

  validateFeedback() {
    this.feedbackText = this.feedbackText.trim()
    var result = this.validationService.validateText(this.feedbackText)
    // console.log(result)
    return result;
  }

  async uploadFeedback() {
    if (this.validateAddress() && this.validateFeedback()) {
      var userAddress = this.authenticationService.getUserAddress();
      await this.feedbackService.addFeedback(this.feedbackText, userAddress, this.institutionAddress);
    } else {
      alert("Invalid address / feedback!")
    }
  }
  
}
