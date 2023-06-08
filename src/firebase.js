// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCoc7AOb8oHGwkohMSfHDEIwPwAyjPHbuE",
    authDomain: "netflix-clone-f3e15.firebaseapp.com",
    projectId: "netflix-clone-f3e15",
    storageBucket: "netflix-clone-f3e15.appspot.com",
    messagingSenderId: "1050690074090",
    appId: "1:1050690074090:web:228ea8843ccdbc5d22ae93"
  };

// firebase is initialize
  const firebaseApp =firebase.initializeApp(firebaseConfig);
// firebase app database is initallized
  const db=firebaseApp.firestore(); //firestore is the realtime database
  const auth =firebase.auth();


  export {auth} ;
  // this is expicit export and can be many
  // default have only a single export

  export default db;

  













