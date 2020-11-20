import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable()
export class ProfessionalService {

  constructor() {
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }
  getProfessionals(){
    return firebase.database().ref().child('Professionals');
  }
}
