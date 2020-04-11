import { Injectable } from '@angular/core';
import { Interaction } from './interaction.model';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import Config from '../../env.js'


@Injectable({
  providedIn: 'root'
})

export class InteractionService {
  private interactions : Interaction[] = [];

  constructor(private http: HttpClient) {}

  async retrieveAllInteractions(address : string) {
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


  async addInteraction(file: string, recipient: string, institution: string) {
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
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        console.log(res);
        return res
      })
  

  }

  async invalidateInteraction(hash: string, user: string) {
    await fetch(Config.IP_ADDRESS + '/truffle/invalidate/hash', {
      method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              hash: hash,
              user: user
            }) 
        })
      .catch((error) => {console.log(error)})
      .then((response : Response) => response.json())
      .then((res) => {
        console.log(res);
        // this.interactions = res.message
      })
  

  }

}
