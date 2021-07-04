import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCHH2eLPWuTZ8DaTyVNV4TRffVKnfIO2oE",
    authDomain: "sohham-game.firebaseapp.com",
    projectId: "sohham-game",
    storageBucket: "sohham-game.appspot.com",
    messagingSenderId: "871549785620",
    appId: "1:871549785620:web:c9bc9ff5e334da93317901"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();