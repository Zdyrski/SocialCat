import React, { Component } from "react";
import Comment from "./comment";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      commentValue: "",
    };
  }

  onCommentValueChange(e) {
    this.setState({ commentValue: e.target.value });
  }

  submitComment(e) {
    e.preventDefault();

    let opts = {
      content: this.state.commentValue,
    };

    const token = JSON.parse(localStorage.getItem("auth"));

    const urlAddPost = `http://127.0.0.1:5000/addcomment/${this.props.post_id}`;

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

  /*
  componentDidMount() {
    console.log("propsss", this.props.comments[this.props.post_id - 1]);
    console.log("this.props.postiddd", this.props.post_id);
    console.log("this.props.comment_iddd", this.props.comments[0].comments[0]);
  }
*/

  componentDidUpdate() {
    //console.log("generalComments", this.props.comments);
    //console.log("propsss", this.props.comments[this.props.post_id - 1]);
    //console.log("this.props.postiddd", this.props.post_id);
    //console.log("this.state.commentsWWWWWW", this.state.comments);
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            placeholder="Add a comment"
            className="shareInput"
            value={this.commentValue}
            onChange={this.onCommentValueChange.bind(this)}
          />
          <IconButton
            className="addCommentButton"
            style={{ marginLeft: "-11rem" }}
            onClick={this.submitComment.bind(this)}
          >
            <AddIcon className="addIcon" />
          </IconButton>
        </div>
        {this.props.comments.map((comms) =>
          comms.comments.map((com) => {
            if (this.props.post_id == com.post_id) {
              return (
                <Comment
                  key={com.comment_id}
                  id={this.props.post_id - 1}
                  className={this.props.className}
                  in={this.props.in}
                  value={0}
                  content={com.content}
                  first_name={com.first_name}
                />
              );
            }
          })
        )}
      </div>
    );
  }
}

export default Comments;
