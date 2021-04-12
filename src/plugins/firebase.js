// firebase config

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// config
const config = {
    apiKey: "AIzaSyBw71oCHvBCUhkRye13adSC4RXEvTDszUg",
    authDomain: "web-apps-roadmap.firebaseapp.com",
    projectId: "web-apps-roadmap",
    storageBucket: "web-apps-roadmap.appspot.com",
    messagingSenderId: "754344780727",
    appId: "1:754344780727:web:c7204cd542dfe6d52cbe32",
    measurementId: "G-29245FVS9T"
};

// firebase initialization
firebase.initializeApp(config);
//composition
const firestore = firebase.firestore();
const auth = firebase.auth();

//enable persistence
firestore.enablePersistence({ experimentalForceOwningTab: true });

export { auth, firestore };
