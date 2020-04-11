import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../7_services/validation/validation.service';
import { Feedback } from '../7_services/feedback/feedback.model';
import { FeedbackService } from '../7_services/feedback/feedback.service';

const IP_ADDRESS = "http://localhost:3000";

@Component({
  selector: 'app-search-institution-button',
  templateUrl: './search-institution-button.component.html',
  styleUrls: ['./search-institution-button.component.scss'],
})

export class SearchInstitutionButtonComponent implements OnInit {
  institutionAddress : string
  feedbacks : Feedback[] = []
  // myControl = new FormControl('value', this.validateAddress(address));

  constructor(private validationService: ValidationService, private feedbackService: FeedbackService) {}

  ngOnInit() {}

  validateInput(address) {
    this.institutionAddress = address
    var bool = this.validationService.validateAddress(address);
    var message = bool ? "Validated" : "Invalidated"
    console.log(message);
  }

  handleClick() {
    this.retrieveAllFeedback(this.institutionAddress);
  }
  
  async retrieveAllFeedback(address : string) {
    this.feedbacks = await this.feedbackService.retrieveAllFeedback(address);
  }

  async remove(item) {
    console.log(item);
    console.log(item.owner);
    var user = "0x2192e76c85648edcdef826c07c9464788747c326";
    console.log(this.institutionAddress);
    this.feedbackService.deleteFeedback(item.id, user, "0xa0ce3bdd2615fe4959e6fdf30955d73924da2e7c");
    //this.interactionService.deleteInteraction(item.hash, "0x2192e76c85648edcdef826c07c9464788747c326");
  }

}
