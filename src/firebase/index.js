import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdKytdx1laT2hwtblZKG4V5Y_kJMMvxfw",
  authDomain: "fragrancera.firebaseapp.com",
  projectId: "fragrancera",
  storageBucket: "fragrancera.appspot.com",
  messagingSenderId: "205636284537",
  appId: "1:205636284537:web:560b4bed378f928670e4a8"
};

export const app = initializeApp(firebaseConfig);




export const dbase = getFirestore(app);