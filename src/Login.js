import "./Login.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MomApp from "./MomApp";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const credentials = {
    test: "1234",
    admin: "1234",
  };
  const ids = {
    test: 1,
    admin: 0,
  };
  const handleCancel = () => {
    setPassword("");
    setUserName("");
  };
  const handleSubmit = () => {
    if (credentials[userName] && credentials[userName] == password) {
      setLoggedIn(true);
      if (userName === "admin") {
        setIsAdmin(true);
      }
    }
  };
  return (
    <div className="frame">
      {loggedIn ? (
        <MomApp isAdmin={isAdmin} user={userName}/>
      ) : (
        <>
          <h2>Login Form</h2>
          <div className="imgcontainer">
            <img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              className="avatar"
            />
          </div>

          <div className="container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              required
            />
            <label for="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              name="psw"
              required
            />

            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>

          <div className="container">
            <button type="button" className="cancelbtn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
