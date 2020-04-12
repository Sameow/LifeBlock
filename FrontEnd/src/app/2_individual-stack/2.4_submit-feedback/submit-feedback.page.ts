import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../7_services/feedback/feedback.model';
import { FeedbackService } from '../../7_services/feedback/feedback.service';
import { ValidationService } from '../../7_services/validation/validation.service';
import { AuthenticationService } from '../../7_services/authentication/authentication.service';
@Component({
  selector: 'app-submit-feedback',
  templateUrl: 'submit-feedback.page.html',
  styleUrls: ['submit-feedback.page.scss']
})


export class SubmitFeedbackPage implements OnInit {
  feedbackText : string
  feedback: Feedback
  institutionAddress: string
  
  constructor(
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
  
  async handleClick() {
    if (!this.validateAddress()) {
      alert("Input Address for institution is not valid!")
    } else if (!this.validateFeedback()) {
      alert("Input feedback is not valid!")
    } else {
      await this.uploadFeedback();
    }
  }

  validateAddress() {
    var result = this.validationService.validateAddress(this.institutionAddress) 
    return result;
  }

  validateFeedback() {
    this.feedbackText = this.feedbackText.trim()
    var result = this.validationService.validateText(this.feedbackText)
    return result;
  }

  async uploadFeedback() {
      var userAddress = this.authenticationService.getUserAddress();
      var res = await this.feedbackService.addFeedback(this.feedbackText, userAddress, this.institutionAddress);
      if (res['success']) {
        (document.getElementById("address-input") as HTMLInputElement).value = "";
        (document.getElementById("feedback-input") as HTMLInputElement).value = "";      
        alert(`Feedback has been successfully uploaded for ${this.institutionAddress}!`)
      } else {
        alert(`Failed to add feedback, please try again!`)
      }
  }
  
}
