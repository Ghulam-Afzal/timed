import React from "react";
import Navbar from "../navbar/Navbar";
// import "./s.css";
import { SignUpForm } from '../forms/signUpForm'

export const SignUpPage = () => {
  return (
    <div>
      <Navbar />
      <SignUpForm />
      {/* <div className="s-container">
        <div className="s-logo">TIMED</div>

        <div className="s-form">FORM</div>
      </div>*/}
    </div> 
  );
};
