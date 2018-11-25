import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, AlertController, TextInput} from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Firebase} from '@ionic-native/firebase';
import firebase from 'firebase/app';
import {Subscription} from 'rxjs';

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
export class LoginPage implements OnInit, OnDestroy {

  @ViewChild('phoneNumber') phoneNumber: TextInput;

  private authSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private fireAuth: AngularFireAuth,
    private fireNative: Firebase,
  ) {
  }

  ngOnInit() {
    this.authSub = this.fireAuth.authState.subscribe((user: firebase.User) => {
      console.log('LoginPage user', user);
      if (user) {
        this.doLogin();
      }
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  async registerPhone(): Promise<void> {
    const phone = '+48' + this.phoneNumber.value;
    const {verificationId} = await this.fireNative.verifyPhoneNumber(phone, 120);
    this.showPrompt(verificationId);
  }

  private async verifyCode(code: string, verificationId: string): Promise<void> {
    const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    await this.fireAuth.auth.signInAndRetrieveDataWithCredential(credential);
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

