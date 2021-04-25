import firebase from 'firebase';
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyBWGadXyShnnsMS-DfNTNz893F-NOP2DEE",
    authDomain: "form-entry-15a86.firebaseapp.com",
    projectId: "form-entry-15a86",
    storageBucket: "form-entry-15a86.appspot.com",
    messagingSenderId: "900733284095",
    appId: "1:900733284095:web:a158f08847a6ac9365a6ca"
};
// Initialize Firebase
const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();