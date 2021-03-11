import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-particularchatroom',
  templateUrl: './particularchatroom.page.html',
  styleUrls: ['./particularchatroom.page.scss'],
})
export class ParticularchatroomPage implements OnInit {

  constructor(public nav:NavController, public activatedRoute:ActivatedRoute) { }

  texter = ""
  roomId
  chatdetail = {}
  msgDetails = []
  userId

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId')
    firebase.auth().onAuthStateChanged(() => {
      // this.sendCloud()
      this.getDetails()
      this.userId = firebase.auth().currentUser.uid

    })
  }

  back() {
    this.nav.navigateRoot('tabs/tab1')
  }

  getDetails() {
    let latestPhoto = ""
    let user = ""
    let currentDate
    let remaindingTime
    firebase.database().ref('chatroom/' + this.roomId + '/chatdetail/').on('value', data => {
      // for(let key in data.val()) {
      //   user = data.val()[key]['createdBy'] //users 
      //   firebase.database().ref('users/' + user).on('value', data => {
      //     latestPhoto = data.val()['photo']
      //     this.msgDetails = data.val()['photo']
      //     console.log(this.msgDetails)
      //   })
      // }
      if(data.exists()) {
        // for(let key in data.val()){
        //   let item = data.val()[key]
        //   item['lastestPhoto'] = latestPhoto
        //   console.log(item['lastestPhoto'])
        // }
        // data.val()['latestPhoto'] = latestPhoto
        // console.log(data.val()['latestPhoto'])
        this.msgDetails = Object.values(data.val())
        // console.log(this.msgDetails['dateCreated'])

        // currentDate = new Date().toLocaleDateString()
        // console.log(currentDate)
        // console.log(this.msgDetails['dateCreated'])

        // if(this.msgDetails['dateCreated'] != currentDate) {
        //   remaindingTime = currentDate - this.msgDetails['dateCreated']
        //   console.log(remaindingTime)
        // } else {
        //   console.log('date same')
        // }

        // console.log(this.msgDetails)
      } else {
        console.log('no data exists')
      }
    })
  }

  sendCloud() {
    //get input value
    this.chatdetail = {
      dateCreated: firebase.database.ServerValue.TIMESTAMP,
      detail: this.texter,
      createdBy: firebase.auth().currentUser.uid,
      roomId: this.roomId,
    }
    firebase.database().ref('chatroom/' + this.roomId + '/chatdetail/').push(this.chatdetail)
      .then(() => {
        this.texter = ""
      }).catch(e => {
        console.log(e)
      })
  }

}