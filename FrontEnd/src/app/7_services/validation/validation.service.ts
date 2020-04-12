import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // This just tests the regex, actual checksum is performed over at the server.  
  validateAddress(address) {
    return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
  }

  // Ensures text is in ascii form and not empty
  validateText(text) {
    if (!text) {
      return false
    }
    return /^[\x00-\x7F]*$/.test(text);
  }

}
