import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {app} from './'

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("result", result);
      if(result.operationType == "signIn") {
         

        

        window.location.href = '/about-you';
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};


export const logOut = () => {
  signOut(auth).then((result)=> {
    window.location.href = '/login';
  }).catch((err)=> {
    console.log(err)
  })
}