import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAvHabpx8h9U-Wn-HJ99qk6qJncu-uJ7RU",
  authDomain: "newshoppingcartt.firebaseapp.com",
  databaseURL: "https://newshoppingcartt.firebaseio.com",
  projectId: "newshoppingcartt",
  storageBucket: "newshoppingcartt.appspot.com",
  messagingSenderId: "1000236527853"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
