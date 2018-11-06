import {Component, ViewChild, OnInit} from '@angular/core';
import {IonicPage, NavController, AlertController, TextInput} from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Firebase} from '@ionic-native/firebase';
import firebase from 'firebase/app';
import {map} from 'rxjs/operators/map';

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

  @ViewChild('phoneNumber') phoneNumber: TextInput;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private fireAuth: AngularFireAuth,
    private fireNative: Firebase,
  ) {
  }

  ngOnInit() {
    console.log('LoginPage ngOnInit');
    this.fireAuth.authState.pipe(
      map(async (auth: firebase.User) => {
        const token = await auth.getIdToken();
        console.log('LoginPage ngOnInit() token', token);
        if (token) {
          this.doLogin();
        }
      })
    );
  }

  async registerPhone(): Promise<void> {
    const phone = '+48' + this.phoneNumber.value;
    const {verificationId} = await this.fireNative.verifyPhoneNumber(phone, 120);
    this.showPrompt(verificationId);
  }

  private async verifyCode(code: string, verificationId: string): Promise<void> {
    const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    this.doLogin();
  }

  private showPrompt(verificationId: string): void {

    let promptCode = this.alertCtrl.create({
      title: 'Verify',
      message: 'Type code that was received via SMS',
      inputs: [
        {
          name: 'code',
          type: 'tel',
          placeholder: 'Code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
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

