import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";

import kFormatter from "../../../utils/kFormatter";

import Panel from "../../Panel";

import { useStyles } from "../../../styles/MaterialUI";
import {
  Container,
  Row,
  PostImage,
  Separator,
  Avatar,
  Column,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  SendIcon,
  PostOptionsIcon,
  DisLikeIcon,
  DisLikedIcon,
} from "./styles";

import { FaThumbsDown } from "react-icons/fa";
import AddComment from "../../Comment/addComment";

const FeedPost = ({ user, title, avatar, image = "", hideComment = false }) => {
  const classes = useStyles();
  const [isDisliked, setIsDisliked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const reactions = useMemo(() => ["like", "unlike"], []);
  const slicedReactions = useMemo(
    () => reactions.sort(() => 0.5 - Math.random()).slice(0, 3),
    []
  );
  const comments = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );
  const likes = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );
  const time = useMemo(() => Math.floor(Math.random() * (24 - 1)) + 1, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Panel>
      <Container>
        <Row className="heading">
          <Avatar src={avatar} alt="Rocketseat" />
          <Column>
            <h3>{user}</h3>
            <h4>{"Software Engineering student at ncit"}</h4>
            <Tooltip
              title={`${user} posted ${time}h ago`}
              placement="bottom"
              arrow
              classes={{ tooltip: classes.tooltip }}
            >
              <time>{`${time}h`}</time>
            </Tooltip>
          </Column>
          <div className="post-options" onClick={handleClick}>
            <PostOptionsIcon />
          </div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Row>
        <PostImage
          src={
            image ||
            "https://blog.rocketseat.com.br/content/images/2019/05/Painel.png"
          }
          alt="Rocketseat Blog"
        />
        <Row className="likes">
          <span className={`circle ${reactions[0]}`} />

          <Tooltip
            title={`${likes} users likes this post`}
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <span className="number">{likes}</span>
          </Tooltip>
          <span
            style={{ marginLeft: "1rem" }}
            className={`circle ${reactions[1]}`}
          />
          <Tooltip
            title={`${likes} users dislikes on post`}
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <span className="number">{likes}</span>
          </Tooltip>

          <span className="number">•</span>
          <Tooltip
            title={`${comments} users commented on this post`}
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <span className="number">{`${comments} Comments`}</span>
          </Tooltip>
        </Row>
        <Row>
          <Separator />
        </Row>
        <Row className="actions">
          <Tooltip
            title="React to the post"
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <button type="button">
              <LikeIcon />
            </button>
          </Tooltip>
          <Tooltip
            title="React to the post"
            placement="bottom"
            style={hideComment ? { marginLeft: "auto" } : null}
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <button onClick={() => setIsDisliked(!isDisliked)} type="button">
              {!isDisliked && <DisLikeIcon />}
              {isDisliked && <DisLikedIcon />}
            </button>
          </Tooltip>
          {!hideComment && (
            <Tooltip
              title="Comment on the post"
              placement="bottom"
              arrow
              classes={{ tooltip: classes.tooltip }}
            >
              <button
                onClick={() => setShowComment(!showComment)}
                style={{ marginLeft: "auto" }}
                type="button"
              >
                <CommentIcon />
                <span>Comment</span>
              </button>
            </Tooltip>
          )}
        </Row>
        {/* Comment section down below */}
        <Row>
          <Separator />
        </Row>
        {showComment && (
          <Row style={{ display: "block" }}>
            <AddComment />
            <AddComment />
            <AddComment />
            <AddComment />
            <br />
            <Box display={"flex"}>
              <Avatar style={{ opacity: "0", cursor: "default" }} src="null" />
              <TextField
                label={"comment"}
                variant="outlined"
                placeholder="Add Comment Here"
                style={{ minWidth: "360px" }}
              />
              <Button
                variant="contained"
                style={{
                  alignSelf: "flex-start",
                  background: "#3170ac",
                  color: "#fff",
                  textTransform: "none",
                  marginLeft: "1rem",
                }}
              >
                Comment
              </Button>
            </Box>
          </Row>
        )}
        <br />
      </Container>
    </Panel>
  );
};

export default FeedPost;
