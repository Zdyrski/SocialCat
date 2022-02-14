import React, { Component } from "react";
import "../styles/activeFriends.css";

class ActiveFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }

  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem("auth"));
    const urlPosts = "http://localhost:5000/friendslist";
    const responseFriends = await fetch(
      urlPosts,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          Authorization: "Bearer " + token.user.access_token,
        },
        method: "get",
      },
      { credentials: "include" }
    );
    const dataFriends = await responseFriends.json();
    this.setState({ friends: dataFriends.friends });
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="activeUser" id="heading">
          <h5>Friends list</h5>
        </div>
        {this.state.friends.map((friend) => {
          return (
            <div key={friend.user_id} className="activeUser">
              <a
                href={`http://localhost:3000/profile/${friend.user_id}`}
                className="profilePointer"
              >
                {friend.first_name} {friend.last_name}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ActiveFriends;
