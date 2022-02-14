/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/navbar.css";
import { Search } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { LogoutAuthAction } from "../redux/actions/AuthAction";
import history from "../history";

function NavBar(props) {
  const [searchContent, setSearchContent] = useState("");
  const { auth, logout } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchContent}`);
  };

  function onSearchChange(e) {
    setSearchContent(e.target.value);
    console.log(searchContent);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid" id="mainContainer">
        <a href="/home">
          <img src="/assets/catLogo.png" alt="" className="catLogo" />
        </a>
        <a className="navbar-brand" href="/home">
          SocialCat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Wall
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/profile/0">
                Homepage <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <a href="/profile/0">
            <img
              src="/assets/profilePicture.png"
              alt=""
              className="profilePicture"
            />
          </a>
          <button
            className="exitButton"
            onClick={() => {
              logout();
              history.push("/");
              //window.location.reload();
            }}
          >
            <ExitToAppIcon className="exitButtonIcon" />
          </button>
        </div>
        <form
          className="form-inline my-2 my-lg-0 fixed-top"
          id="search"
          onSubmit={handleSubmit}
        >
          <button className="searchButton" type="submit">
            <Search className="searchIcon" />
          </button>
          <div className="searchContainer">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search for friends"
              aria-label="Search"
              id="searchBar"
              value={searchContent}
              onChange={onSearchChange}
            />
          </div>
        </form>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(LogoutAuthAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
