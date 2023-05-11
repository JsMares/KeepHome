var firebase = require('firebase')
// datos de firebase
var config = {

  apiKey: "acjmCmLxATjbpXDkDpYqMTXBoUV7GbkNE1Kjmu2P",
  authDomain: "https://keephome-2e54e-default-rtdb.firebaseio.com/",
  projectId: "keephome-2e54e",
  storageBucket: "keephome-2e54e.appspot.com",
  messagingSenderId: "604160895193",
  appId: "1:604160895193:web:17da725d5d26df42bfb6c8",
  measurementId: "G-2HFR2T2FSN"
};

const fire = firebase.initializeApp(config);
module.exports = fire;