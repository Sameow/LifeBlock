import { Injectable } from '@angular/core';
import { Feedback } from './feedback.model';
import Config from '../../env.js'



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks : Feedback[] = [];
  constructor() { }

  async retrieveAllFeedback(address : string) {
    await this.fetchFeedback(address);
    return [...this.feedbacks];
  }

  async fetchFeedback(address : string) {
    address = address.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/feedback?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        if (res.success) {
          this.feedbacks = res.message
        }
      })
  }


  async addFeedback(feedback: string, user: string, institution: string) {
    user = user.toLowerCase()
    institution = institution.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/feedback', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              feedback: feedback,
              institution: institution,
              user : user
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        console.log(res);
      })
  }
  
  async deleteFeedback(feedbackID: string, user: string, institution: string) {
    await fetch(Config.IP_ADDRESS + '/truffle/feedback/invalidate', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            feedbackID: feedbackID,
              user: user,
              institution: institution
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        console.log(res);
        // this.interactions = res.message
      })
  

  }


  async retrieveAllGivenFeedback(address : string) {
    await this.fetchGivenFeedback(address);
    return [...this.feedbacks];
  }

  async fetchGivenFeedback(address : string) {
    address = address.toLowerCase()
    await fetch(Config.IP_ADDRESS + '/truffle/feedback/individual?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        if (res.success) {
          this.feedbacks = res.message
        }
      })
  }



}
