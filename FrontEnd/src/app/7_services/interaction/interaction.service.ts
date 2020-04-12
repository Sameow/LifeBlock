import { Injectable } from '@angular/core';
import { Interaction } from './interaction.model';
import Config from '../../env.js'


@Injectable({
  providedIn: 'root'
})

export class InteractionService {
  private interactions : Interaction[] = [];

  constructor() {}

  async retrieveAllInteractions(address : string) {
    this.interactions = [];
    await this.fetchInteractions(address);
    return [...this.interactions];
  }

  async filterValidInteractions(array) {
    return array.filter(element => {
      return element['isValid'] == true
    })
  }

  retrieveInteraction(interactionHash : string) {
    return this.interactions.find(interaction => {
      return interaction.hash === interactionHash;
    })
  }

  async retrieveAllGivenInteractions(address : string) {
    await this.fetchGivenInteractions(address);
    return [...this.interactions];
  }

  async fetchInteractions(address : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/profile?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async (res) => {
        if (res.success) {
            this.interactions = await this.filterValidInteractions(res.message)
        }
      })
  }

  async fetchGivenInteractions(address : string) {
    await fetch(Config.IP_ADDRESS + '/truffle/hash?address=' + (address), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
      })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then(async (res) => {
        if (res.success) {
            this.interactions = await this.filterValidInteractions(res.message)
        }
      })
  }


  async addInteraction(file: string, recipient: string, institution: string) {
    return new Promise<Object>(async function(resolve, reject) {
      await fetch(Config.IP_ADDRESS + '/truffle/hash', {
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                file: file,
                recipient: recipient,
                institution: institution
              }) 
          })
        .catch((error) => {reject({success: false, msg: error})})
        .then((response : Response) => response.json())
        .then((res) => {
          resolve(res);
        })  
    })
  

  }

  async invalidateInteraction(hash: string, recipient: string, from : string) {
    return new Promise<Object>(async function(resolve, reject) {
      await fetch(Config.IP_ADDRESS + '/truffle/invalidate/hash', {
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hash: hash,
                recipient: recipient,
                from : from
              }) 
          })
        .catch((error) => {reject({success: false, msg: error})})
        .then((response : Response) => response.json())
        .then((res) => {
          resolve(res)
        })
      })
  }

}
