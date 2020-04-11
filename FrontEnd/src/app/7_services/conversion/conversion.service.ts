import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConversionService {
  constructor() { 
  }

  async convertBase64(file : Blob) {
    var imagePromise = await this._toBase64(file);
    return imagePromise;
  }

  _toBase64(file : Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  _fromBase64() {
    //do something
  }

}
