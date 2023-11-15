import React, { useState } from "react";
import Header from "../components/Header";
import email from "../images/email.png";
import password from "../images/password.png";
import user from "../images/user.png";
import "../styles/LoginRegister.css";
import Register from "../components/RegisterForm";
import Login from "../components/LoginForm";

function LoginRegister() {
  const [action, setAction] = useState("Sign Up");

  return (
    <>
      <Header />
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign In" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user} alt="" />
              <input type="text" placeholder="User" />
            </div>
          )}

          <div className="input">
            <img src={email} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot password? <span>Click Here</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Sign In" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign In");
            }}
          >
            Sign In
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
