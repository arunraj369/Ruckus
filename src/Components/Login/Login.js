import React, { useState } from "react";
import "./Login.css";
import loginimg from "../assets/Login1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";
// import Redirect from "react-router-dom";

function Login() {
  const [loginUser, setloginUser] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  function handleChange(e) {
    const newloginUser = { ...loginUser };
    newloginUser[e.target.id] = e.target.value;
    setloginUser(newloginUser);
    // console.log(newloginUser);
  }

  const logInData = async (e) => {
    e.preventDefault();

    if (!loginUser.loginEmail === "" || !loginUser.loginPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/User");
      const users = response.data;

      const validateUser = users.find(
        (user) =>
          user.email === loginUser.loginEmail &&
          user.password === loginUser.loginPassword
      );

      if (validateUser) {
        toast.success("Login successfully");
        setLoggedIn(true);
      } else {
        toast.error("Incorrect Email or Password");
        setloginUser({
          loginEmail: "",
          loginPassword: "",
        });
      }
      // console.log(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div class="container-fluid">
      <div
        class="card row flex-md-row flex-column"
        style={{ backgroundColor: "  #e5e5e5", borderRadius: "25px" }}
      >
        <div class="col-md img_div">
          <img src={loginimg} alt="no-img" className="logimg" />
        </div>

        <div class="col-md loginform_div mt-3">
          <div style={{ textAlign: "center", marginTop: "7%" }}>
            <h3>Login</h3>
          </div>
          <div className="mt-5">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={loginUser.loginEmail}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Password"
                  value={loginUser.loginPassword}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={logInData}
                style={{ marginLeft: "43%" }}
              >
                Login
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="d-flex flex-row mt-3" style={{ marginLeft: "20%" }}>
            <p style={{ marginRight: "3%" }}>Create New Account</p>
            <Link to="/signup">Signup</Link>
          </div>
          {loggedIn && <Navigate to="/home" />}
        </div>
      </div>
    </div>
  );
}

export default Login;
