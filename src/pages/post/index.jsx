import React, { useState, useEffect } from "react";

import { useTheme } from "../../hooks";

import {
  DesktopHeader,
  AdBanner,
  LeftColumn,
  MiddleColumn,
  RightColumn,
} from "../../components";
import { getSinglePost } from "../../redux/postSlices";

import { Container, VersionIcon } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
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
const SinglePost = () => {
  const { changeTheme, themeName } = useTheme();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  const {
    get: {
      singlePost: { loading, data },
    },
  } = useSelector((state) => state.post);

  const [anchorEl, setAnchorEl] = useState(null);
  const [reply, setReply] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const toggleReply = () => {
    setReply((prev) => !prev);
  };

  return (
    <Container>
      <DesktopHeader />

      <br />
      <br />

      <main>
        <LeftColumn isLoading={isLoading} />
        {/* post part */}
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
            <Box style={{ padding: "20px" }}>
              <FeedPost
                avatar={"https://www.fillmurray.com/640/360"}
                user="Facebook"
                title="Company"
                image={data?.post?.image}
                hideComment
              />

              <br />
              <br />
              <Typography
                dangerouslySetInnerHTML={{ __html: data.post?.description }}
              ></Typography>

              <br />

              <TextEditor handleDescriptionChange={() => {}} />

              <Button
                style={{
                  marginTop: "100px",
                  alignSelf: "flex-start",
                  backgroundColor: "#4c5aa7",
                  color: "#FFF",
                }}
              >
                Add comment
              </Button>
            </Box>
            <Comment />

            <br />
            <br />
            <br />
            <br />
            <br />
          </Box>
        </Container>

        {/* end of post part */}
        <RightColumn isLoading={isLoading} />
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
