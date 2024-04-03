import React, { useState } from "react";
import "./Signup.css";
import loginimg from "../assets/Signup.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";
function Signup() {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const [SignnedIn, setSignnedIn] = useState(false);

  const signUpData = async (e) => {
    e.preventDefault();

    if (!User.email || !User.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/User", User);
      toast.success("User registered successfully!");
      setUser({ email: "", password: "" });
      setTimeout(() => {
        setSignnedIn(true);
      }, 3000);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user. Please try again.");
    }
  };

  function handleChange(e) {
    const newuser = { ...User };
    newuser[e.target.id] = e.target.value;
    setUser(newuser);
    console.log(newuser);
  }

  return (
    <div class="container-fluid">
      <div
        class="cards row flex-md-row flex-column"
        style={{ backgroundColor: "  #e5e5e5", borderRadius: "25px" }}
      >
        {/* <div class="col img_div">
          <img src={loginimg} alt="no-img" className="logimg" />
        </div> */}
        <div class="col img_div d-flex justify-content-center align-items-center">
          <img src={loginimg} alt="no-img" class="img-fluid logimg" />
        </div>

        <div class="col loginform_div mt-3">
          <div style={{ textAlign: "center", marginTop: "7%" }}>
            <h3>Signup</h3>
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
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={User.email}
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
                  id="password"
                  placeholder="Password"
                  value={User.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={signUpData}
                style={{ marginLeft: "43%" }}
              >
                Signup
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="d-flex flex-row mt-3" style={{ marginLeft: "20%" }}>
            <p style={{ marginRight: "3%" }}>Already i have Account</p>
            <Link to="/login">Login</Link>
          </div>
          {SignnedIn && <Navigate to="/login" />}
        </div>
      </div>
    </div>
  );
}

export default Signup;
