import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfgy4SJxmM4MJIepdzEhRVupa8laL6K1s",
  authDomain: "whtsapp-clone-3ca83.firebaseapp.com",
  projectId: "whtsapp-clone-3ca83",
  storageBucket: "whtsapp-clone-3ca83.appspot.com",
  messagingSenderId: "632220836074",
  appId: "1:632220836074:web:4ba7c69e8191594f023793",
  measurementId: "G-4RVJRL6FBJ",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
