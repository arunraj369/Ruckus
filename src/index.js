import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Topology from "./Components/Topology/Topology";
import Diagram from "./Components/Diagram/Diagram";
import AppInfo from "./Components/AppInfo/AppInfo";
import UserData from './Components/UserData/userdata';
import Add from "./Components/ADD/Add";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Topology" element={<Topology />} />
      <Route path="/Diagram" element={<Diagram />} />
      <Route path="/AppInfo" element={<AppInfo />} />
      <Route path="/UserData" element={<UserData />} />
      <Route path="/Add" element={<Add />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
