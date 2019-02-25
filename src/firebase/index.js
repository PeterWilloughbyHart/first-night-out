import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase-functions'
// import * as admin from'firebase-admin'

firebase.initializeApp(config);

const storage = firebase.storage();

let hidden = process.env;
var config = {
    apiKey: hidden.REACT_APP_API_KEY,
    authDomain: hidden.REACT_APP_AUTH_DOMAIN,
    databaseURL: hidden.REACT_APP_DATABASE_URL,
    projectId: hidden.REACT_APP_PROJECT_ID,
    storageBucket: hidden.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: hidden.REACT_APP_MESSAGING_SENDER_ID
};

export {
    storage, firebase as default
}