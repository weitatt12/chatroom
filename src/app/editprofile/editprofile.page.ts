import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(public nav:NavController) { }

  userDetails = []
  imagectype = '';

  ngOnInit() {
    firebase.auth().onAuthStateChanged(() => {
      this.getUserDetails()
    })
    
  }

  back() {
    this.nav.navigateRoot('tabs/tab3')
  }

  getUserDetails() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', data => {
      this.userDetails = data.val()
    })
  }

  Picturetolink(key, image, imagetype) {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      var metadata = {
        contentType: imagetype,
      };
      let type = imagetype.replace("image/", "")
      let timestamp = new Date().getUTCMilliseconds().toString();
      let storedb = storageRef.child('Account/' + firebase.auth().currentUser.uid + '/Campaign/' + key + '.' + type)
      // Upload the file and metadata
      storedb.putString(image, 'data_url').then(snapshot => {
        console.log(snapshot);
        storedb.getDownloadURL()
          .then(snapshot => {
            console.log(snapshot);
            let url = {
              picture: snapshot
            }
            resolve(snapshot)

          }).catch(function (error) {
            // Handle any errors  
            alert('Error uploading image')
            this.pageChange.dismissLoading('loading');
            reject(new Error(error))
          });
      });
    })
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (1048576 * 8)) {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var cw = canvas.width;
      var ch = canvas.height;
      var maxW = 1000;
      var maxH = 1000;
      this.imagectype = event.target.files[0].type;
      console.log('ji')

      var img = new Image;
      img.onload = () => {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        this.userDetails['photo'] = canvas.toDataURL("image/" + this.imagectype, 0.1);
        console.log(this.userDetails['photo'])
        console.log(this.imagectype)
        // this.newphoto = true;
      }

      img.src = URL.createObjectURL(event.target.files[0]);
    } else {
      alert("Your Current Image Too Large, " + event.target.files[0].size / (1024 * 1024) + "MB! (Please choose file lesser than 8MB)")
    }
  }

  save() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(this.userDetails)
      .then(() => {
        this.nav.navigateRoot('tabs/tab3')
      }).catch(e => {
        console.log(e)
      })
  }

}
