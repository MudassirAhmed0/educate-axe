import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase/auth";
import { dbase } from "../../firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

const GetApp = ({ bgGray, bgWhite }) => {
  const [name, set_name] = useState("");
  const [phone, set_phone] = useState("");
  const [email, set_email] = useState("");
  const [message, set_message] = useState("");
  const [userId, set_userId] = useState('');

  // const [userId, set_userId] = useState("");
  const [messageSubmitted, set_messageSubmitted] = useState(false);


  const [enterName, set_enterName] = useState(false);
  const [enterEmail, set_enterEmail] = useState(false);
  const [enterPhone, set_enterPhone] = useState(false);
  const [enterMessage, set_enterMessage] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      set_userId(currentUser.uid)
    })
  }, [])


  const submitMessage = () => {
    // console.log("submitMessage")
    if (name == "") {
      set_enterName(true);
    } else {
      set_enterName(false);
    }
    if (phone == "") {
      set_enterPhone(true);
    } else {
      set_enterPhone(false);
    }
    if (email == "") {
      set_enterEmail(true);
    } else {
      set_enterEmail(false);
    }
    if (message == "") {
      set_enterMessage(true);
    } else {
      set_enterMessage(false);
    }




    if (name !== "" && phone !== "" && email !== "" && message !== "") {




      let questionObj = {};
      questionObj = {
        id: userId,
        name: name,
        phone: phone,
        email: email,
        message: message,
      }

      const questionData = collection(dbase, 'questions');
      addDoc(questionData, questionObj)
        .then(response => {
          console.log("cr res", response);
          set_messageSubmitted(true);

          setTimeout(() => {
            set_messageSubmitted(false);
          }, 4000);
          set_name('');
          set_phone('');
          set_email('');
          set_message('');
        })
        .catch(error => {
          console.log("cr error", error);
        })


    }
  };

  // console.log('userId',userId)
  return (
    <section
      id="contact-team-section"
      className={`py-[40px] overflow-hidden ${bgGray ? "bg-gray" : ""} ${bgWhite ? "bg-white" : ""
        }`}
    >
      <div className="container h-[100%]">
        <div className="flex justify-between lg:flex-row flex-col items-center h-[100%]">
          <div
            className="lg:w-[45%] w-[100%] flex justify-start items-start flex-col lg:pl-[70px] pl-[0] pr-[10px] lg:pt-[0] pt-[7%]"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="700"
          >
            <h3 className="fib lg:text-[36px] text-[25px] capitalize pb-[8px]">
              Contact Our Team
            </h3>
            <div>
              <p className="fib text-[22px] mb-[35px] text-blue leading-[30px] uppercase">
                We're heppy to answer your queries & Get you shared on wise
              </p>
              <div className="font-medium text-[18px]">
                <a className="block" href="mailto:techteam@educate.in">
                  techteam@educateapp.in
                </a>
                {/*  <a className="block">+91 7831818181</a>
                <a className="block">@educatelive</a>*/}
              </div>
            </div>
          </div>
          <div className="lg:w-[55%] w-[100%] flex justify-center items-center">
            <div className="teamFoemContainer mt-[20px]  overflow-hidden rounded-lg shadow-lg max-w-[400px] w-[100%]">
              <div className="fib text-center text-[#fff] bg-[#4d97ff] font-medium text-[24px] py-[13px] ">
                Have a Question?
              </div>
              <div className="teamFoem py-[30px] px-[30px] ">
                <div className="mb-[15px]">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    className="w-[100%]"
                    value={name}
                    onChange={(e) => set_name(e.target.value)}
                  />
                  {enterName ?
                    <p className="text-[11px] text-red-600 mb-[-10px]">
                      Please enter your 'Name'
                    </p>
                    : ""}
                </div>
                <div className="mb-[15px]">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    className="w-[100%]"
                    value={phone}
                    onChange={(e) => set_phone(e.target.value)}
                  />
                  {enterPhone ?
                    <p className="text-[11px] text-red-600 mb-[-10px]">
                      Please enter your 'Phone Number'
                    </p>
                    : ""}
                </div>
                <div className="mb-[15px]">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="w-[100%]"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                  />
                  {enterEmail ?
                    <p className="text-[11px] text-red-600 mb-[-10px]">
                      Please enter your 'Email'
                    </p>
                    : ""}
                </div>
                <div className="mb-[15px]">
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Please Write Message"
                    className="focus:border-gray-600"
                    style={{
                      width: "100%",
                      outline: 0,
                      border: "1px solid #d1d1d1",
                      padding: "16.5px 14px",
                      borderRadius: "3px",
                      minHeight: "100px",
                    }}
                    value={message}
                    onChange={(e) => set_message(e.target.value)}
                  />
                  {enterMessage ?
                    <p className="text-[11px] text-red-600 mb-[-10px]">
                      Please type some 'Message'
                    </p>
                    : ""}
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="contained"
                    // fullWidth="true"
                    sx={{ width: "100%", maxWidth: "160px", display: "inline-block" }}
                    onClick={() => submitMessage()}
                  >
                    <span className="fim capitalize block p-[3px]">
                      Contact Us
                    </span>
                  </Button>
                </div>
                <div className="h-[20px]">
                  {messageSubmitted ? (
                    <p className="text-green-600 text-[12px] pt-4 text-center">
                      Your Message has been submitted!
                    </p>
                  ) : (
                    ""
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
