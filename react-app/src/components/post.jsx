import React, { useState } from "react";
import "../styles/post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Comments from "./comments";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [value, setValue] = useState(props.value);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [created, setCreated] = useState(props.created);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card mb-3" id="cardPost">
      <div className="card-body">
        <div className="top">
          <img
            src="/assets/profilePicture.png"
            alt=""
            className="userProfilePicture"
          />
          <button type="button" id="postUsernameButton">
            <span className="postUsername">
              <a
                href={`http://localhost:3000/profile/${props.userId}`}
                className="profileLink"
              >
                {name}
              </a>
            </span>
          </button>
          <div className="postDate">{created}</div>
          <div className="dropdown">
            <IconButton
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <MoreVertIcon id="moreVertIcon" />
            </IconButton>
            <div className="dropdown-menu" id="postDropdownMenu">
              <a className="dropdown-item" href="/">
                Delete
              </a>
              <a className="dropdown-item" href="/">
                Edit
              </a>
            </div>
          </div>
        </div>
        <div className="center">
          <span className="postContent">{description}</span>
          <img src="/assets/sunset.jpg" alt="" className="postImage" />
        </div>
        <div className="bottom">
          <IconButton
            className="likeButton"
            onClick={() => setValue(value + 1)}
          >
            <ThumbUpAltIcon className="likeIcon" />
          </IconButton>
          <IconButton
            className="heartButton"
            onClick={() => setValue(value + 1)}
          >
            <FavoriteIcon className="heartIcon" />
          </IconButton>
          <span className="count">{value}</span>
          <span className="addShowComments">
            Show comments ({props.commentsNumber})
          </span>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            id="showCommentsButton"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Comments
            className={classes.root}
            in={expanded}
            post_id={props.post_id}
            comments={props.comments}
          />
        </div>
      </div>
    </div>
  );
}
