import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public nav:NavController) { }

  name = "";
  email = "";
  password = "";
  gender = "";
  dob = "";
  imagectype = '';
  imagec = '';

  ngOnInit() {
    
  }

  back() {
    this.nav.pop()
  }

  getGender(e){
    this.gender = e.target.value
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
        this.imagec = canvas.toDataURL("image/" + this.imagectype, 0.1);
        console.log(this.imagec)
        console.log(this.imagectype)
        // this.newphoto = true;
      }

      img.src = URL.createObjectURL(event.target.files[0]);
    } else {
      alert("Your Current Image Too Large, " + event.target.files[0].size / (1024 * 1024) + "MB! (Please choose file lesser than 8MB)")
    }
  }

  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        let data = {
          date: firebase.database.ServerValue.TIMESTAMP,
          dob: this.dob,
          email: this.email,
          gender: this.gender,
          name: this.name,
          password: this.password,
          photo: this.imagec,
          id: firebase.auth().currentUser.uid,
        }
        firebase.database().ref('users/' + data.id).update(data)
          .then(() => {
            this.nav.navigateRoot('tabs/tab1')
          })
      }).catch(e => {
        console.log(e)
      })
  }

  

}
