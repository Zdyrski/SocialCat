import React, { Component } from "react";
import "../styles/share.css";
import SendIcon from "@material-ui/icons/Send";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import { Button, colors } from "@material-ui/core";
import axios from "axios";

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareValue: "",
    };
  }

  onShareValueChange(e) {
    this.setState({ shareValue: e.target.value });
  }

  submitShare(e) {
    e.preventDefault();

    let opts = {
      content: this.state.shareValue,
    };

    const token = JSON.parse(localStorage.getItem("auth"));

    const urlAddPost = "http://127.0.0.1:5000/addpost";

    fetch(urlAddPost, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        Authorization: "Bearer " + token.user.access_token,
      },
      credentials: "include",
      body: JSON.stringify(opts),
    });
  }

  render() {
    return (
      <div className="card mb-3" id="card">
        <div className="card-body" id="card-body">
          <div className="top">
            <img
              src="/assets/profilePicture.png"
              alt=""
              className="profileSharePicture"
            />
            <input
              placeholder="What's up?"
              className="shareInput"
              value={this.shareContent}
              onChange={this.onShareValueChange.bind(this)}
            />
          </div>
          <Button className="shareButton" onClick={this.submitShare.bind(this)}>
            <IconButton type="button" className="shareButton">
              <SendIcon className="shareIcon" />
            </IconButton>
          </Button>
        </div>
        <button type="button" id="AddAPhotoButton">
          <AddAPhotoIcon id="AddAPhotoIcon" />
        </button>
      </div>
    );
  }
}

export default Share;
