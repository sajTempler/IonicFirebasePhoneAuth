import {Component, ViewChild, OnInit} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Firebase} from '@ionic-native/firebase';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  @ViewChild('phoneNumber') phoneNumber;

  constructor(
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private fire: Firebase,
  ) {
  }

  ngOnInit() {
    console.log('LoginPage ngOnInit');
    this.fireAuth.authState.subscribe(auth => {
      if (!auth) {
        return;
      }

      auth.getIdToken()
        .then((token: string) => {
          console.log('LoginPage getIdToken token', token);
          if (token) {
            this.doLogin();
          }
        });
    });
  }

  // tslint:disable-next-line
  private registerPhone(): void {
    console.log('registerPhone');
    const phone = '+48' + this.phoneNumber.value;
    console.log('registerPhone phone', phone);
    this.fire.verifyPhoneNumber(phone, 120)
      .then((res) => {
        const {verificationId} = res;
        console.log('registerPhone verificationId', verificationId);
        this.showPrompt(verificationId);
      })
      .catch(err => {
        console.log('registerPhone err', err);
      })
  }

  private async verifyCode(code: string, verificationId: string) {
    try {
      const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      await firebase.auth().signInWithCredential(credential)
        .then(() => {
          this.doLogin();
        })
        .catch(err => {
          console.error('LoginPage verifyCode signInWithCredential err', err);
        })
    } catch (err) {
      console.error('LoginPage verifyCode err', err);
    }
  }

  private showPrompt(verificationId: string) {
    let promptCode = this.alertCtrl.create({
      title: 'Verify',
      message: 'Type code that was received via SMS',
      inputs: [
        {
          name: 'code',
          placeholder: 'Code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            return;
          }
        },
        {
          text: 'Verify',
          handler: data => {
            this.verifyCode(data.code, verificationId);
          }
        }
      ]
    });
    promptCode.present();
  }

  private doLogin(): void {
    this.navCtrl.setRoot('HomePage');
  }
}

