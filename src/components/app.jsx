import React, { Component } from "react";
import NavBar from "./navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Calculator from "./content/calculator.jsx";
import Login from "./content/login.jsx";
import Register from "./content/register.jsx";
import NotFound from "./content/notFound.jsx";
import Home from "./content/home.jsx";
import { Navigate } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
