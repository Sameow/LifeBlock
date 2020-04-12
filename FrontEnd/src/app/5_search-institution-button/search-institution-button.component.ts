import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../7_services/validation/validation.service';
import { Feedback } from '../7_services/feedback/feedback.model';
import { FeedbackService } from '../7_services/feedback/feedback.service';

@Component({
  selector: 'app-search-institution-button',
  templateUrl: './search-institution-button.component.html',
  styleUrls: ['./search-institution-button.component.scss'],
})

export class SearchInstitutionButtonComponent implements OnInit {
  institutionAddress : string
  feedbacks : Feedback[] = []

  constructor(private validationService: ValidationService, private feedbackService: FeedbackService) {}

  ngOnInit() {}

  handleInput(address) {
    this.institutionAddress = address
  }

  validateInput(address) {
    return this.validationService.validateAddress(address);
  }

  async handleClick() {
    var result = this.validateInput(this.institutionAddress);
    if (!result) {
      alert("Invalid address! Please check again");
    } else {
      await this.retrieveAllFeedback(this.institutionAddress);
    }
  }
  
  async retrieveAllFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllFeedback(address);
  }

}
