import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public nav:NavController, public activatedRoute:ActivatedRoute) {}

  chatRooms = []
  id

  ngOnInit() {
    this.getChatrooms()
  }

  chatroom(x) {
    let userId = firebase.auth().currentUser.uid
    let currentUserCount = x.currentUsers ? Object.keys(x.currentUsers) : 0

    if(currentUserCount['length'] > x.capacity){
      alert('max')
    } else {
      firebase.database().ref('chatroom/' + x.roomId + '/currentUsers/').push(userId)
        .then(() => {
          this.nav.navigateForward('particularchatroom/' + x.roomId)
        }).catch(e => {
          console.log(e)
      })
    }
  }

  count(currentUser) {
    if(currentUser) {
      return Object.keys(currentUser).length
    } else {
      return 0
    }
  }

  getChatrooms() {
    firebase.database().ref('chatroom/').orderByChild('dateCreated').on('value', data => {
      if(data.exists()) {
        this.chatRooms = Object.values(data.val())
        this.chatRooms.reverse()
      }
    })
  }

  addNewChat() {
    this.nav.navigateForward('addnewchat')
  }

}
