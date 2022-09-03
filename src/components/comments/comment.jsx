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
import { useState } from "react";
import { FaReply, FaThumbsUp } from "react-icons/fa";
import { PostOptionsIcon } from "../MiddleColumn/FeedPost/styles";

const Comment = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reply, setReply] = useState(false);
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

  return (
    <Paper style={{ padding: "40px 20px", marginTop: 100, margin: "20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item></Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Grid container justifyContent="space-between" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={"https://www.fillmurray.com/640/360"}
            />
            <Typography
              component={"span"}
              variant="h6"
              style={{ margin: "0 0 0 15px", textAlign: "left" }}
            >
              <strong> Michel Michel</strong>
            </Typography>
            <IconButton
              style={{ marginLeft: "auto" }}
              className="post-options"
              onClick={handleClick}
            >
              <PostOptionsIcon />
            </IconButton>
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
          </Grid>
          <br />
          <p style={{ textAlign: "left", marginTop: "" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
            Suspendisse congue vulputate lobortis. Pellentesque at interdum
            tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis
            ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus,
            efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque
            et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum,
            mauris mi vehicula urna, nec feugiat quam lectus vitae ex.{" "}
          </p>
          <p
            style={{
              textAlign: "left",
              color: "gray",
              marginTop: "10px",
            }}
          >
            posted 1 minute ago
          </p>
          <br />
          <FaThumbsUp style={{ cursor: "pointer", color: "#474545" }} /> {"10"}
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
                <TextField variant="outlined" style={{ width: "500px" }} />
                <Button style={{ marginLeft: "20px" }} variant="contained">
                  Reply
                </Button>
              </Box>
            </>
          )}
          <Box
            style={{
              padding: "10px 30px",
              background: "#ddd",
              borderRadius: "10px",
              margin: "20px 0 20px 10px",
            }}
          >
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Avatar />
              <span style={{ marginLeft: "10px" }}>My name</span>
            </Box>
            <Box>
              ho therwardadf ho therwardadf ho therwardadf ho therwardadfho
              therwardadf ho therwardadf ho therwardadf ho therwardadf
            </Box>
          </Box>
          <Box
            style={{
              padding: "10px 30px",
              background: "#ddd",
              borderRadius: "10px",
              margin: "10px 0 10px 10px",
            }}
          >
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Avatar />
              <span style={{ marginLeft: "10px" }}>My name</span>
            </Box>
            <Box>
              ho therwardadf ho therwardadf ho therwardadf ho therwardadfho
              therwardadf ho therwardadf ho therwardadf ho therwardadf
            </Box>
          </Box>
          <br />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
