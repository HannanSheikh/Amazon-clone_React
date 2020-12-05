import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCC7dl28AczcrjLNjTP94zUa9CCOAJ0FDs",
    authDomain: "clone-b20cc.firebaseapp.com",
    databaseURL: "https://clone-b20cc.firebaseio.com",
    projectId: "clone-b20cc",
    storageBucket: "clone-b20cc.appspot.com",
    messagingSenderId: "836909699984",
    appId: "1:836909699984:web:489d40fc795b248431d915",
    measurementId: "G-XZJ80M1L3R"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export{db, auth};