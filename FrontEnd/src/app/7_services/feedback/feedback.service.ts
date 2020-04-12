import { Injectable } from '@angular/core';
import { Feedback } from './feedback.model';
import Config from '../../env.js'



@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks : Feedback[] = [];
  constructor() { }

  // Fetches feedback for an institution
  async retrieveAllFeedback(address : string) {
    this.feedbacks = [];
    await this.fetchFeedback(address);
    return [...this.feedbacks];
  }

  // Fetches feedback added by an individual
  async retrieveAllGivenFeedback(address : string) {
    this.feedbacks = []
    await this.fetchGivenFeedback(address);
    return [...this.feedbacks];
  }

  async filterValidFeedback(array) {
    return array.filter(element => {
      return element['isValid'] == true
    })
  }

  async fetchFeedback(address : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/feedback?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async(res) => {
        if (res.success) {
          this.feedbacks = await this.filterValidFeedback(res.message)
        }
      })
  }

  async fetchGivenFeedback(address : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/feedback/individual?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async (res) => {
        if (res.success) {
          this.feedbacks = await this.filterValidFeedback(res.message)
        }
      })
  }

  async addFeedback(feedback: string, user: string, institution: string) {
    return new Promise<Object>(async function(resolve, reject) {
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
        .catch((error) => {reject({success: false, msg: error})})
        .then((response : Response) => response.json())
        .then((res) => {
          resolve(res)
        })
      })
  }
  
  async invalidateFeedback(feedbackID: string, user: string, institution: string) {
    return new Promise<Object>(async function(resolve, reject) {
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
        .catch((error) => {reject({success: false, msg: error})})
        .then((response : Response) => response.json())
        .then((res) => {
            resolve(res)
          })
      });
  }
}
