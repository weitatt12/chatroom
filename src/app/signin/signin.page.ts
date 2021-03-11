import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(public nav:NavController) { }

  email = '';
  password = '';

  ngOnInit() {
  }

  signin() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.nav.navigateRoot('tabs/tab1');
      }).catch(e => {
        console.log(e)
      })
  }

  signup() {
    this.nav.navigateForward('register');
  }

}