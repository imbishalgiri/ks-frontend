import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const AddComment = () => {
  return (
    <Box style={{ marginTop: "1rem" }}>
      <Box style={{ display: "flex" }}>
        <Avatar src="https://github.com/leoronne.png" />
        <Box
          style={{
            background: "#f6f5f5",
            marginLeft: "1rem",
            borderRadius: "5px",
            padding: ".5rem",
            alignSelf: "stretch",
          }}
        >
          <Box component={"span"}>
            <Typography style={{ fontSize: "1rem" }}>
              hi there hi there hi there hi there hi there hi there hi there hi
              there hi there hi there hi there hi there hi there hi there hi
              there hi there hi there hi there
            </Typography>
          </Box>
        </Box>
      </Box>
      <small style={{ marginLeft: "5rem" }}>
        <span style={{ color: "#3170ac", cursor: "pointer" }}>
          <span style={{ color: "#515050" }}>3</span> likes
        </span>
        <span
          style={{ color: "#3170ac", marginLeft: "1rem", cursor: "pointer" }}
        >
          reply
        </span>
      </small>
    </Box>
  );
};

export default AddComment;
