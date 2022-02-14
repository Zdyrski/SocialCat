import React, { Component } from "react";
import Post from "./post";
import "../styles/home.css";

class Posts extends Component {
  state = {
    post: [
      { id: 1, value: 0, name: "Marek", description: "What a nice view!" },
      { id: 2, value: 0, name: "Darek", description: "What a nice view!" },
    ],
    postsList: [],
    comments: [],
    postCount: 3,
  };

  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem("auth"));
    const urlPosts = "http://localhost:5000/postslist/0/3";
    const responsePosts = await fetch(
      urlPosts,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          Authorization: "Bearer " + token.user.access_token,
        },
      },
      { credentials: "include" }
    );
    const dataPosts = await responsePosts.json();
    this.setState({ postsList: dataPosts.posts });
    //console.log("postslist: ", this.state.postsList[0].post_id);

    for (let i = 0; i < this.state.postsList.length; i++) {
      const urlComments = `http://localhost:5000/commentslist/${this.state.postsList[i].post_id}/0/${this.state.postCount}`;
      const responseComments = await fetch(
        urlComments,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
            Authorization: "Bearer " + token.user.access_token,
          },
        },
        {
          credentials: "include",
        }
      );
      const dataComments = await responseComments.json();
      this.setState({ comments: [...this.state.comments, dataComments] });
      //console.log("this.state.comments: ", this.state.comments);
    }
  }

  async handleClick() {
    const token = JSON.parse(localStorage.getItem("auth"));

    const urlComments = `http://localhost:5000/postslist/${
      this.state.postCount
    }/${this.state.postCount + 3}`;

    const response = await fetch(urlComments, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        Authorization: "Bearer " + token.user.access_token,
      },
      credentials: "include",
    });
    const dataPosts = await response.json();
    for (let i = 0; i < dataPosts.posts.length; i++) {
      this.setState({
        postsList: [...this.state.postsList, dataPosts.posts[i]],
      });
    }
    this.setState({ postCount: this.state.postsList.length + 1 });
  }

  render() {
    return (
      <>
        <div>
          {this.state.postsList.map((postsList) => (
            <Post
              key={postsList.post_id}
              post_id={postsList.post_id}
              value={0}
              name={postsList.first_name}
              description={postsList.content}
              comments={this.state.comments}
              length={this.state.postsList.length}
              postList={this.state.postsList}
              commentsNumber={postsList.comments_number}
              userId={postsList.user_id}
              created={postsList.created}
            />
          ))}
        </div>
        <button
          type="button"
          className="seeMorePostsButton"
          onClick={this.handleClick.bind(this)}
        >
          See more posts
        </button>
      </>
    );
  }
}

export default Posts;
