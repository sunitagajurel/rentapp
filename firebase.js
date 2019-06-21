import * as firebase from 'firebase';
import firestore from 'firebase/firestore'



const config = {
  apiKey: "AIzaSyAI8nijM1COn1nlG9O7TDdePqXCuAorFNQ",
  authDomain: "rentingapp-967bb.firebaseapp.com",
  databaseURL: "https://rentingapp-967bb.firebaseio.com",
  projectId: "rentingapp-967bb",
  storageBucket: "rentingapp-967bb.appspot.com",
  messagingSenderId: "689938074675",
  appId: "1:689938074675:web:386f57f92cfc91d5"
};

firebase.initializeApp(config);



export default firebase;