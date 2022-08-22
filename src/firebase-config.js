// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyAdKytdx1laT2hwtblZKG4V5Y_kJMMvxfw",
// //   authDomain: "fragrancera.firebaseapp.com",
// //   projectId: "fragrancera",
// //   storageBucket: "fragrancera.appspot.com",
// //   messagingSenderId: "205636284537",
// //   appId: "1:205636284537:web:560b4bed378f928670e4a8"
// // };

// const firebaseConfig = {
//   apiKey: "AIzaSyBXrnKMmi9kqxN1f7S09uQ4nznHJLapF_U",
//   authDomain: "project-n-7007b.firebaseapp.com",
//   databaseURL: "https://project-n-7007b-default-rtdb.firebaseio.com",
//   projectId: "project-n-7007b",
//   storageBucket: "project-n-7007b.appspot.com",
//   messagingSenderId: "92395886379",
//   appId: "1:92395886379:web:ff726a9e0afa3b3200976e"
// };

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log("result", result);
//       if(result.operationType == "signIn") {
//         console.log("redirect now");

//         const id = result.user.uid;
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const phone = result.user.phoneNumber;

//         localStorage.setItem("id",id)
//         // localStorage.setItem("name",name)
//         localStorage.setItem("email",email)
//         localStorage.setItem("phone",phone)

//         window.location.href = '/about-you';
//       }
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };

// export const logOut = () => {
//   signOut(auth).then((result)=> {
//     window.location.href = '/login';
//   }).catch((err)=> {
//     console.log(err)
//   })
// }

// export const dbase = getFirestore(app);