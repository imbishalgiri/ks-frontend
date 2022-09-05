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
  LikedIcon,
  CommentIcon,
  ShareIcon,
  SendIcon,
  PostOptionsIcon,
  DisLikeIcon,
  DisLikedIcon,
} from "./styles";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import AddComment from "../../Comment/addComment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const FeedPost = ({
  user,
  title,
  avatar,
  image = "",
  hideComment = false,
  allLikes = [],
  allComments = [],
  userName = "",
  time = "",
  post = "",
  isLoading,
  single = false,
}) => {
  const classes = useStyles();
  const [isDisliked, setIsDisliked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state?.auth);
  const curUser = auth?.user;

  const likes = allLikes.filter((el) => el?.likeType === "u");
  const disLikes = allLikes.filter((el) => el?.likeType === "d");

  // handeling likes in here
  useEffect(() => {
    if (Array.isArray(likes) && likes?.length) {
      const foundUser = likes.find((el) => el?.user?._id === curUser?._id);
      if (foundUser) setLiked(true);
    }
    if (Array.isArray(disLikes) && disLikes?.length) {
      const foundUser = disLikes.find((el) => el?.user?._id === curUser?._id);
      if (foundUser) setIsDisliked(true);
    }
  }, [likes?.length, disLikes?.length]);
  // handeling likes in here

  console.log(likes, disLikes);

  const reactions = useMemo(() => ["like", "unlike"], []);
  const slicedReactions = useMemo(
    () => reactions.sort(() => 0.5 - Math.random()).slice(0, 3),
    []
  );
  const comments = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate(`dashboard/${post}`);
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
              title={`${user} posted ${time}`}
              placement="bottom"
              arrow
              classes={{ tooltip: classes.tooltip }}
            >
              <time>{time}</time>
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
          style={{ cursor: "pointer" }}
          onClick={!single && handleNavigate}
          src={
            image ||
            "https://blog.rocketseat.com.br/content/images/2019/05/Painel.png"
          }
          alt="Rocketseat Blog"
        />
        <Row className="likes">
          <Tooltip
            title={
              <Box>
                {!likes?.length && "no likes"}
                {likes?.map((singleLike) => (
                  <Box>
                    {singleLike?.user?.firstName +
                      " " +
                      singleLike?.user?.lastName}
                  </Box>
                ))}
              </Box>
            }
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <Box>
              <FaThumbsUp color={"#7185f6"} />
              <span className="number">{likes?.length || 0}</span>
            </Box>
          </Tooltip>

          <Tooltip
            title={
              <Box>
                {!disLikes?.length && "no disikes"}
                {disLikes?.map((singleLike) => (
                  <Box>
                    {singleLike?.user?.firstName +
                      " " +
                      singleLike?.user?.lastName}
                  </Box>
                ))}
              </Box>
            }
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <Box style={{ marginLeft: "25px", marginRight: "10px" }}>
              <FaThumbsDown style={{ marginTop: "1px" }} color={"#7185f6"} />
              <span className="number">{disLikes?.length || 0}</span>
            </Box>
          </Tooltip>

          <span className="number">•</span>
          <Tooltip
            title={`${allComments?.length || 0} users commented on this post`}
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <span className="number">{`${
              allComments?.length || 0
            } Comments`}</span>
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
              {!liked && <LikeIcon />}
              {liked && <LikedIcon />}
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
            {allComments?.map((singleComment) => (
              <AddComment
                likes={singleComment?.likes}
                replies={singleComment?.replies}
                description={singleComment?.comment}
              />
            ))}
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
