import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { FaReply, FaThumbsUp, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addReply } from "../../redux/commentSlices";
import {
  addReplyStatic,
  removeCommentStatic,
  removePostStatic,
} from "../../redux/postSlices";
import { PostOptionsIcon } from "../MiddleColumn/FeedPost/styles";
import { SocketContext } from "../../context/socket";
import { useContext } from "react";
import AxiosInstance from "../../apis/axios";
import useUser from "../../hooks/checkUser";
import { confirm } from "mui-confirm-modal";

const Comment = ({
  avatar = "",
  replies: [],
  name = "",
  comment = "",
  actualComment = {},
  commentId = "",
  postId = "",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reply, setReply] = useState(false);
  const [replyData, setReplyData] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isThisUser] = useUser();

  // const [commentId, setCommentId] = useState("");

  const dispatch = useDispatch(false);
  const socket = useContext(SocketContext);

  const { isReplying, isReplied } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);

  // if replied, send replied to the socket
  useEffect(() => {
    if (isReplied) {
      setReplyData("");
      socket?.emit("addReply", isReplied, postId);
      dispatch(addReplyStatic({ ...isReplied }));
    }
  }, [isReplied]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleReply = () => {
    setReply((prev) => !prev);
  };

  const handleReplyChange = (e) => {
    setReplyData(e.target.value);
  };

  const handleLike = () => {
    AxiosInstance.post("comments/like", { comment: commentId, likeType: "u" })
      .then((data) => {
        if (liked) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        } else {
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      })
      .catch((err) => {
        toast.error("error");
      });
  };

  const handleReplySubmit = (commentId) => {
    // setCommentId(commentId);
    if (!replyData) {
      toast.info("replied nothing");
      return setReply(false);
    }

    dispatch(
      addReply({
        comment: commentId,
        description: replyData,
      })
    );
  };

  useEffect(() => {
    setLikeCount(actualComment?.likes?.length);
    if (actualComment?.likes?.find((el) => el?.user?._id === user?._id)) {
      setLiked(true);
    }
  }, [actualComment?.likes?.length]);

  const handleCommentDelete = async (commentId) => {
    if (
      await confirm({
        title: "Delete Post",
        message: "Are you sure you wanna do this?",
      })
    ) {
      const promise = new Promise((resolve, reject) =>
        AxiosInstance.delete("comments/" + commentId)
          .then((data) => {
            handleClose();
            resolve("done");
            dispatch(removeCommentStatic(commentId));
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

  return (
    <Paper
      style={{
        padding: "40px 20px",
        marginTop: 100,
        margin: "20px",
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item></Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Grid container justifyContent="space-between" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={
                avatar ||
                "https://placehold.jp/626c62/ffffff/150x150.png?text=KS%20USER"
              }
            />
            <Typography
              component={"span"}
              variant="h6"
              style={{ margin: "0 0 0 15px", textAlign: "left" }}
            >
              <strong> {name}</strong>
            </Typography>
            <IconButton
              style={{
                marginLeft: "auto",
                opacity: `${isThisUser(actualComment?.user?._id) ? 1 : 0}`,
              }}
              className="post-options"
              onClick={handleClick}
            >
              <PostOptionsIcon />
            </IconButton>
            {isThisUser(actualComment?.user?._id) && (
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
                <MenuItem
                  onClick={() => handleCommentDelete(actualComment?._id)}
                >
                  <FaTrash style={{ color: "#7c8a96", marginRight: "10px" }} />{" "}
                  Delete
                </MenuItem>
              </Menu>
            )}
          </Grid>
          <br />
          <p
            style={{ textAlign: "left", marginTop: "" }}
            dangerouslySetInnerHTML={{ __html: comment }}
          ></p>
          <br />
          <small
            style={{
              textAlign: "left",
              color: "gray",
              marginTop: "5px",
            }}
          >
            {moment(actualComment?.createdAt).fromNow()}
          </small>
          <br />
          <br />

          <FaThumbsUp
            onClick={handleLike}
            style={{
              cursor: "pointer",
              color: `${liked ? "#4250af" : "#474545"}`,
            }}
          />
          {" " + likeCount}
          <FaReply
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={toggleReply}
          />
          <br />
          <br />
          {reply && (
            <>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0 20px 10px",
                }}
              >
                <TextField
                  onChange={handleReplyChange}
                  value={replyData}
                  variant="outlined"
                  style={{ width: "500px" }}
                />
                <Button
                  style={{ marginLeft: "20px", textTransform: "none" }}
                  variant="contained"
                  onClick={() => handleReplySubmit(actualComment?._id)}
                >
                  {/* {!isReplying && "Reply"} */}
                  {/* {isReplying  (
                    <CircularProgress
                      size={"20px"}
                      style={{ margin: "5px 10px" }}
                    />
                  )} */}
                  Reply
                </Button>
              </Box>
            </>
          )}
          {actualComment?.replies?.map((singleActual) => {
            return (
              <Box
                style={{
                  padding: "10px 30px",
                  background: "#ddd",
                  borderRadius: "10px",
                  margin: "10px 0 10px 10px",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={singleActual?.user?.avatar} />
                  <span style={{ marginLeft: "10px" }}>
                    {singleActual?.user?.firstName +
                      " " +
                      singleActual?.user?.lastName}
                  </span>
                </Box>
                <Box style={{ marginLeft: "50px" }}>
                  {singleActual?.description}
                </Box>
              </Box>
            );
          })}
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
