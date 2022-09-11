import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
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

import { FaThumbsDown, FaThumbsUp, FaTrash } from "react-icons/fa";
import AddComment from "../../Comment/addComment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AxiosInstance from "../../../apis/axios";
import { toast } from "react-toastify";
import { SaveIcon } from "../../LeftColumn/ProfilePanel/styles";
import useUser from "../../../hooks/checkUser";
import { confirm } from "mui-confirm-modal";
import { removePostStatic } from "../../../redux/postSlices";
import { refreshMe } from "../../../redux/authSlices";

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
  userId = "",
  postTitle,
  faculty = "Software Engineering",
}) => {
  const classes = useStyles();
  const [isDisliked, setIsDisliked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();
  const [isThisUser] = useUser("");
  const dispatch = useDispatch();

  const auth = useSelector((state) => state?.auth);
  const curUser = auth?.user;

  const likes = allLikes.filter((el) => el?.likeType === "u");
  const disLikes = allLikes.filter((el) => el?.likeType === "d");

  useEffect(() => {
    setTotalLikes(likes?.length);
    setTotalDislikes(disLikes?.length);
  }, [likes?.length, disLikes?.length]);

  // handeling likes in here
  useEffect(() => {
    if (Array.isArray(likes) && likes?.length) {
      const foundUser = likes.find((el) => el?.user?._id === curUser?._id);
      if (foundUser) {
        setLiked(true);
        setIsDisliked(false);
      }
    }
    if (Array.isArray(disLikes) && disLikes?.length) {
      const foundUser = disLikes.find((el) => el?.user?._id === curUser?._id);
      if (foundUser) {
        setIsDisliked(true);
        setLiked(false);
      }
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

  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    }

    AxiosInstance.post("likes/create", { post, likeType: "u" })
      .then((suc) => {
        !liked && setTotalLikes(totalLikes + 1);
        !liked && totalDislikes > 0 && setTotalDislikes(totalDislikes - 1);
        setLiked(true);
      })
      .catch((error) => {
        toast.error("Error Liking");
      });
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    AxiosInstance.post("likes/create", { post, likeType: "d" })
      .then((suc) => {
        !isDisliked && totalLikes > 0 && setTotalLikes(totalLikes - 1);
        !isDisliked && setTotalDislikes(totalDislikes + 1);
        setIsDisliked(true);
      })
      .catch((error) => {
        toast.error("Error Liking");
      });
  };

  const handleDelete = async () => {
    if (
      await confirm({
        title: "Delete Post",
        message: "Are you sure you wanna do this?",
      })
    ) {
      const promise = new Promise((resolve, reject) =>
        AxiosInstance.delete("posts/" + post)
          .then((data) => {
            handleClose();
            resolve("done");
            dispatch(removePostStatic(post));
            navigate("/");
          })
          .catch((err) => {
            handleClose();
            reject("err");
          })
      );

      toast.promise(promise, {
        pending: "Deleting...",
        success: "Deleted.",
        error: "could not delete",
      });
    } else {
      handleClose();
    }
  };

  const handlePin = async (postId) => {
    let pinnedIds = auth.me?.pinnedPosts?.map((el) => el?._id) || [];
    console.log("pinned ids -->", pinnedIds);
    if (pinnedIds?.find((el) => el === postId)) {
      pinnedIds = auth.me?.pinnedPosts?.filter((el) => el?._id !== postId);
      postId = null;
    }
    const promise = new Promise((resolve, reject) =>
      AxiosInstance.put("/users/update", {
        _id: auth.user?._id,
        pinnedPosts: [...pinnedIds, postId],
      })
        .then((res) => {
          resolve("done");
          dispatch(refreshMe());
          handleClose();
        })
        .catch((err) => {
          reject("error");
        })
    );
    toast.promise(promise, {
      pending: "please wait...",
      success: "successfully accomplished",
      error: "could not pin post",
    });
  };

  const hasPost = () => {
    if (auth?.me?.pinnedPosts?.find((el) => el?._id === post)) return true;
    return false;
  };

  return (
    <Panel>
      <Container>
        <Row className="heading">
          <Avatar
            onClick={() => navigate("/profile/" + userId)}
            src={avatar}
            alt="Rocketseat"
          />
          <Column>
            <h3>{user}</h3>
            <h4>{faculty + " student at ncit"}</h4>
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
            <MenuItem onClick={() => handlePin(post)}>
              <SaveIcon style={{ marginRight: "10px" }} />{" "}
              {hasPost() ? "unpin" : "pin"}
            </MenuItem>
            {isThisUser(userId) && (
              <MenuItem onClick={handleDelete}>
                <FaTrash style={{ color: "#7c8a96", marginRight: "10px" }} />
                Delete
              </MenuItem>
            )}
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
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
              <span className="number">{totalLikes}</span>
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
              <span className="number">{totalDislikes}</span>
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
            <button onClick={handleLike} type="button">
              {!liked && <LikeIcon />}
              {liked && <LikedIcon />}
            </button>
          </Tooltip>
          {hideComment && (
            <Typography
              style={{
                color: "#6a7076",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "20px",
              }}
            >
              {postTitle}
            </Typography>
          )}
          <Tooltip
            title="React to the post"
            placement="bottom"
            style={hideComment ? { marginLeft: "auto" } : null}
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <button onClick={handleDislike} type="button">
              {!isDisliked && <DisLikeIcon />}
              {isDisliked && <DisLikedIcon />}
            </button>
          </Tooltip>
          {!hideComment && (
            <Typography
              style={{
                color: "#6a7076",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "20px",
              }}
            >
              {postTitle}
            </Typography>
          )}
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
                avatar={singleComment?.user?.avatar}
              />
            ))}
            <br />
          </Row>
        )}
        <br />
      </Container>
    </Panel>
  );
};

export default FeedPost;
