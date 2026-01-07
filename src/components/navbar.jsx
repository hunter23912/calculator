import React, { Component } from "react";
import { use } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

class NavBar extends Component {
  state = {};

  handleLogout = () => {
    $.ajax({
      url: "http://localhost:8000/calapp/logout/",
      type: "get",
      success: (resp) => {
        if (resp.result === "success") {
          window.location.href = "/calapp";
        }
      },
    });
  };

  render_calculator = () => {
    if (this.props.is_login) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/calapp/calculator">
            计算器
          </Link>
        </li>
      );
    } else {
      return "";
    }
  };

  render_user = () => {
    if (this.props.is_login) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-brand" style={{ cursor: "pointer" }}>
              {this.props.username}
            </a>
          </li>
          <li className="nav-item">
            <a onClick={this.handleLogout} className="nav-brand" style={{ cursor: "pointer" }}>
              退出
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/calapp/login">
              登录
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calapp/register">
              注册
            </Link>
          </li>
        </ul>
      );
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-body-tertiary" style={{ userSelect: "none" }}>
        <div className="container">
          <Link className="navbar-brand" to="/calapp">
            Web
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/calapp/home">
                  首页
                </Link>
              </li>
              {this.render_calculator()}
            </ul>
            {this.render_user()}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
