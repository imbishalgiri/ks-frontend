import React, { useState, useEffect } from "react";

import { useTheme } from "../../hooks";

import {
  DesktopHeader,
  AdBanner,
  LeftColumn,
  MiddleColumn,
  RightColumn,
} from "../../components";
import {
  addCommentStatic,
  addReplyStatic,
  getSinglePost,
} from "../../redux/postSlices";

import { Container, VersionIcon } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import FeedPost from "../../components/MiddleColumn/FeedPost";
import TextEditor from "../../components/common/textEditor";
import { PostOptionsIcon } from "../../components/MiddleColumn/FeedPost/styles";
import { FaThumbsUp, FaReply } from "react-icons/fa";
import Comment from "../../components/comments/comment";
import LoadingFeedShare from "../../components/Shimmer/LoadingFeedShare";
import LoadingFeedPost from "../../components/Shimmer/LoadingFeedPost";
import Skeleton from "../../components/Skeleton";
import { useRef } from "react";
import { toast } from "react-toastify";
import { addComment } from "../../redux/commentSlices";
import { SocketContext } from "../../context/socket";
import { useContext } from "react";
import Appbar from "../../components/appbar";
import moment from "moment";
import { getMe, getNotice } from "../../redux/authSlices";
const SinglePost = () => {
  const { changeTheme, themeName } = useTheme();
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const boxRef = useRef();
  const { isCommenting, isCommented } = useSelector((state) => state.comment);
  const { user, meRefresh } = useSelector((state) => state.auth);
  const socket = useContext(SocketContext);
  const {
    get: {
      singlePost: { loading, data },
    },
  } = useSelector((state) => state.post);

  const [anchorEl, setAnchorEl] = useState(null);
  const [reply, setReply] = useState(false);
  const [comment, setComment] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    user?._id && dispatch(getMe(user?._id));
  }, [user?._id, meRefresh]);

  useEffect(() => {
    dispatch(getNotice());
  }, []);

  // socket operations in here
  useEffect(() => {
    socket.on("receiveComment", (comment) => {
      dispatch(addCommentStatic(comment));
      toast.info("someone just commented on this post");
    });

    socket.on("receiveReply", (reply) => {
      dispatch(addReplyStatic(reply));
    });
  }, [socket]);

  useEffect(() => {
    if (postId && socket) {
      socket.emit("joinPost", postId);
    }
  }, [postId]);
  //-----------------------------------------------------------

  // useEffect(() => {
  //   if (!loading) {
  //     boxRef?.current?.scrollIntoView();
  //   }
  // }, [loading]);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  useEffect(() => {
    if (isCommented) {
      // if comment succeeded,send comment to the socket
      socket.emit("addComment", isCommented, postId);
      dispatch(addCommentStatic(isCommented));
      setComment(null);
    }
  }, [isCommented]);

  const toggleReply = () => {
    setReply((prev) => !prev);
  };
  const handleCommentAdd = () => {
    if (!comment || comment === "<p></p>")
      return toast.info("Nothing to comment");
    const submitData = {
      post: data?._id,
      comment,
    };
    dispatch(addComment(submitData));
  };

  return (
    <Container>
      <Appbar />

      <main style={{ marginTop: "100px" }}>
        <LeftColumn isLoading={false} />
        {loading && (
          <Container
            style={{ width: "900px", height: "1000px", padding: "20px" }}
          >
            <LoadingFeedPost num={30} />
          </Container>
        )}
        {/* post part */}
        {!loading && (
          <Container style={{ width: "900px" }}>
            <Box
              style={{
                width: "900px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                ref={boxRef}
                style={{ padding: "0 20px", marginTop: "-12px" }}
              >
                <FeedPost
                  avatar={`${
                    data?.user?.avatar ||
                    "https://placehold.jp/626c62/ffffff/150x150.png?text=KS%20USER"
                  }`}
                  user={data?.user?.firstName + " " + data?.user?.lastName}
                  title="Company"
                  image={data?.image}
                  hideComment
                  likeType=""
                  single={true}
                  allLikes={data?.likes}
                  allComments={data?.comments}
                  faculty={data.user?.faculty}
                  key={data?._id}
                  post={data?._id}
                  userId={data?.user?._id}
                  postTitle={data?.title}
                  time={moment(data?.createdAt)?.fromNow()}
                />

                <br />
                <br />
                <Typography
                  style={{
                    padding: "30px 30px",
                    marginTop: "-12px",
                    background: "#fff",
                  }}
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></Typography>

                <br />

                <TextEditor
                  handleDescriptionChange={(data) => {
                    setComment(data);
                  }}
                  clear={isCommented}
                />

                <Button
                  onClick={handleCommentAdd}
                  style={{
                    marginTop: "100px",
                    alignSelf: "flex-start",
                    backgroundColor: "#4c5aa7",
                    color: "#FFF",
                    textTransform: "none",
                  }}
                >
                  {!isCommenting && "Add comment"}
                  {isCommenting && (
                    <CircularProgress
                      size={"30px"}
                      style={{ color: "#fff", margin: "0 30px" }}
                    />
                  )}
                </Button>
              </Box>
              <Box style={{ margin: "20px", width: "100%" }}>
                {data?.comments?.map((singleData) => (
                  <Comment
                    key={singleData?._id}
                    name={
                      singleData?.user?.firstName +
                      " " +
                      singleData?.user?.lastName
                    }
                    comment={singleData?.comment}
                    avatar={singleData?.user?.avatar}
                    replies={singleData?.replies}
                    actualComment={singleData}
                    commentId={singleData?._id}
                    postId={postId}
                  />
                ))}
              </Box>

              <br />
              <br />
              <br />
              <br />
              <br />
            </Box>
          </Container>
        )}

        {/* end of post part */}
        <RightColumn isLoading={false} />
      </main>
    </Container>
  );
};

export default SinglePost;
