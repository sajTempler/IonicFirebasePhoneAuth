## For Ionic 4 check the branch ionic_4 - working version

## Project setup:

You will need your project from Firebase Console.

1. Copy your credentials (click for Web in console) and create `src/app/env.config.ts`
2. In Authentication tab in Firebase Console go to login methods and turn on Phone Auth
3. Optional. Add test phone number in Firebase Console
4. Add your application. Make sure your package ID match the one in Firebase Console - e.g. `com.ionicfirebasephoneauth.demo`
5. Add SHA-1 blueprint - important!
6. Download `google-services.json` and paste it in root folder of project
7. Run app with `ionic cordova run android --device`

## Notes

- Number prefix is hardcoded and set to `+48`
- How to get SHA-1 - https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate
- If you encounter `EACCES` - https://stackoverflow.com/questions/43700489/ionic-build-android-error-spawn-eacces
- If any other issues will appear put it here - https://github.com/sajTempler/IonicFirebasePhoneAuth/issues

> Written with [StackEdit](https://stackedit.io/).
