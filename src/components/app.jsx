import React, { Component } from "react";
import NavBar from "./navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Calculator from "./content/calculator.jsx";
import Login from "./content/login.jsx";
import Register from "./content/register.jsx";
import NotFound from "./content/notFound.jsx";
import Home from "./content/home.jsx";
import { Navigate } from "react-router-dom";
import $ from "jquery";

class App extends Component {
  state = {
    is_login: true,
    username: "",
  };

  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/calapp/get_status/",
      type: "get",
      dataType: "json",
      success: (resp) => {
        if (resp.result === "login") {
          this.setState({
            is_login: true,
            username: resp.username,
          });
        } else {
          this.setState({
            is_login: false,
          });
        }
      },
    });
  }

  render() {
    return (
      <>
        <NavBar is_login={this.state.is_login} username={this.state.username} />
        <div className="container">
          <Routes>
            <Route path="/calapp" element={<Home />} />
            <Route path="/calapp/home" element={<Home />} />
            <Route
              path="/calapp/calculator"
              element={this.state.is_login ? <Calculator /> : <Navigate to="/calapp/login" />}
            />
            <Route
              path="/calapp/login"
              element={this.state.is_login ? <Navigate to="/calapp/calculator" /> : <Login />}
            />
            <Route
              path="/calapp/register"
              element={this.state.is_login ? <Navigate to="/calapp/calculator" /> : <Register />}
            />
            <Route path="/calapp/404" element={<NotFound />} />
            <Route path="/calapp/*" element={<Navigate to="/calapp/404" />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
