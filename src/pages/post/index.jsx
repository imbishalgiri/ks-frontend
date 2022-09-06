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
import io from "socket.io-client";
const SinglePost = () => {
  const ENDPOINT = "http://localhost:5000";
  const { changeTheme, themeName } = useTheme();
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const boxRef = useRef();
  const { isCommenting, isCommented } = useSelector((state) => state.comment);

  const {
    get: {
      singlePost: { loading, data },
    },
  } = useSelector((state) => state.post);

  let socket;

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

  // socket operations in here
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("receiveComment", (comment) => {
      dispatch(addCommentStatic(comment));
    });

    socket.on("receiveReply", (reply) => {
      dispatch(addReplyStatic(reply));
    });
  });
  useEffect(() => {
    if (postId && socket) {
      socket.emit("joinPost", postId);
    }
  }, [postId]);
  //-----------------------------------------------------------

  useEffect(() => {
    if (!loading) {
      boxRef?.current?.scrollIntoView();
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  useEffect(() => {
    if (isCommented) {
      // if comment succeeded,send comment to the socket
      socket.emit("addComment", isCommented, postId);
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
      <DesktopHeader />

      <br />
      <br />

      <main>
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
              <Box ref={boxRef} style={{ padding: "20px" }}>
                <FeedPost
                  avatar={"https://www.fillmurray.com/640/360"}
                  user="Facebook"
                  title="Company"
                  image={data?.image}
                  hideComment
                  likeType=""
                  single={true}
                  allLikes={data?.likes}
                  allComments={data?.comments}
                />

                <br />
                <br />
                <Typography
                  dangerouslySetInnerHTML={{ __html: data.post?.description }}
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
                    avatar={""}
                    replies={singleData?.replies}
                    actualComment={singleData}
                    commentId={singleData?._id}
                    socket={socket}
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

      <div className="theme-container">
        <button type="button" onClick={changeTheme}>
          <VersionIcon />
          <span>{`Change to the ${
            themeName === "new" ? "old" : "new"
          } version`}</span>
        </button>
      </div>
    </Container>
  );
};

export default SinglePost;
