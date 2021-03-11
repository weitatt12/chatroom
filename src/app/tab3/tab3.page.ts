import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public nav: NavController) {}

  profileDetails = []
  name = ""
  dob = 0
  email = ""
  gender = ""
  photo = ""

  ngOnInit() {
    firebase.auth().onAuthStateChanged(() => {
      this.getDetails()
    })
  }

  back() {
    this.nav.pop()
  }

  getDetails() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', data => {
      this.profileDetails = []
      if(data.exists()) {
        this.profileDetails = data.val()
      } else {
        console.log('no data found')
      }
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.nav.navigateRoot('signin')
    })
  }

  edit() {
    this.nav.navigateForward('editprofile')
  }

}
