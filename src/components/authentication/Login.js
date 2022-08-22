import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase/auth";
import Button from "@mui/material/Button";
import googleLogo from "../../assets/images/logo/google.png";
import phoneIcon from "../../assets/images/logo/phone.svg";
import Layout from "../layout/Layout";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loading-icons";

const Login = () => {
  let navigate = useNavigate()
  const [registerEmail, set_registerEmail] = useState("");
  const [registerPassword, set_registerPassword] = useState("");
  const [loginEmail, set_loginEmail] = useState("");
  const [loginPassword, set_loginPassword] = useState("");
  const [number, setNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [user, setUser] = useState()
  const [expandPhone, setExpandPhone] = useState(true)
  const [expandOtp, setExpandOtp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginWithPhone, set_loginWithPhone] = useState(false)

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("user", user);
    } catch (error) {
      console.log("error.message", error.message);
    }
    // console.log("registerEmail", registerEmail);
    // console.log("registerPassword", registerPassword);
    // console.log("loginEmail", loginEmail);
    // console.log("loginPassword", loginPassword);
  };



  // if (user) {
  //   navigate('/about-you')
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser)
  //   }
  //   )

  // }, [])

  const signInWithumber = (e) => {
    e.preventDefault();
    if (number.length == 11 && (number[0] == 0) || (number.length == 12 && (number[0] == 9))) {

      // let _number = number;
      // if (number.length == 11) {
      //   _number = _number.replace("0", "92")
      // }

      window.recaptchaVerifier = new RecaptchaVerifier('recapcha', {
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved")
        }
      }, auth);
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, "+" + number, appVerifier)
        .then(confirmationResult => {
          console.log("confirmationResult", confirmationResult)
          window.confirmationResult = confirmationResult

          setExpandPhone(false)
          setExpandOtp(true)

          console.log("expandPhone", expandPhone)
          console.log("expandOtp", expandOtp)
          document.getElementById('recapcha').style.display = 'none';
        })
        .catch((err) => {
          console.log(err)
          alert("Enter Correct Phone Number");
          document.getElementById('recapcha').style.display = 'none';
          // setNumber('')
          window.location.reload(false);
        })


    } else {
      alert("Enter Correct Phone Number")
    }
  };


  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
        window.location.href = '/about-you';
      }).catch((err) => {
        console.log(err)
      })
    }
  }



  return (
    <>
      <Layout>
        <div className="min-h-[60vh] flex justify-center my-10 items-center gap-x-[10px]">
          <div className="w-[450px] p-[35px] border-[1px] border-gray-300 rounded-[10px]">
            <h1 className="text-4xl text-center mb-[20px]">Login</h1>
            <button
              onClick={() => signInWithGoogle()}
              className="text-[18px] w-[100%] py-[10px] border-[1px] border-gray-300 bg-[#fff] text-gray-700 flex justify-center mt-4 items-center"
            >
              <img src={googleLogo} className="w-[50px] mr-3" />
              Login with Google
            </button>

            <button
              onClick={() => set_loginWithPhone(true)}
              className="text-[18px] w-[100%] py-[10px] border-[1px] border-gray-300 bg-[#fff] text-gray-700 flex justify-center mt-4 items-center"
            >
              <img src={phoneIcon} className="w-[50px] mr-3" />
              Login with Phone
            </button>
            {
              loginWithPhone ?
                <div>
                  {/* <h1 className="text-2xl text-center my-[20px]">login with Number</h1> */}
                  {
                    expandPhone && (
                      <form className="flex my-4" onSubmit={(e) => signInWithumber(e)}>
                        <input type="number" placeholder="91xxxxxxxxxx" className='h-[50px] m-0 mr-2' value={number} onChange={(e) => setNumber(e.target.value)} />
                        <Button variant="contained" onClick={(e) => signInWithumber(e)}>
                          <span className="fim capitalize">Submit</span>
                        </Button>
                      </form>
                    )
                  }
                  {
                    isLoading && (
                      <div className=" w-[100%] flex justify-center">
                        <TailSpin stroke="#1976d2" fill="#1976d2" />
                      </div>
                    )
                  }
                  {
                    expandOtp && (
                      <div className="my-4">
                        <h4 className="mb-3">You will get an OTP via SMS.</h4>
                        <form className="flex" onSubmit={(e) => verifyOtp(e)}>
                          <input type="number" placeholder="123456" className='h-[50px] m-0 mr-2' value={otp} onChange={(e) => setOtp(e.target.value)} />
                          <Button variant="contained" onClick={(e) => verifyOtp(e)}>
                            <span className="fim capitalize">Verify</span>
                          </Button>
                        </form>
                      </div>
                    )
                  }
                  <div className="">
                    <div id="recapcha"></div>
                  </div>
                </div> : ""
            }

          </div>
        </div>

        {/* <div className="text-center pb-[50px]">
        <h4>User Logged In:</h4>

        <button>Sign Out</button>
      </div> */}
      </Layout>
    </>
  );
};

export default Login;
