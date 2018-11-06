import {Firebase} from "@ionic-native/firebase";

export class FirebaseMock extends Firebase {

  verifyPhoneNumber(): Promise<any> {
    return Promise.resolve({verificationId: 'example'})
  }
}
