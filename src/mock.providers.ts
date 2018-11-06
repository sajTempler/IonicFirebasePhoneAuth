import {FirebaseMock} from "./mock";
import {Firebase} from '@ionic-native/firebase';


export const isBrowser = (): boolean => {
  return (
    (document.URL.includes('https://') || document.URL.includes('http://localhost')) &&
    !document.URL.includes('/Application/')
  );
};

const FirebaseFactory = (): Firebase => {
  return isBrowser() ? new FirebaseMock() : new Firebase();
};
export const FirebaseProvider = {
  provide: Firebase,
  useFactory: FirebaseFactory,
};
