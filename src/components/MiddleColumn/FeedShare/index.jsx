import React, { useState } from "react";
import { Tooltip, Button, Modal, Box, Typography } from "@material-ui/core";
import { useTheme } from "../../../hooks";
import Panel from "../../Panel";
import { useStyles } from "../../../styles/MaterialUI";

import {
  Container,
  WriteIcon,
  CameraIcon,
  VideoCameraIcon,
  DocumentIcon,
  ArticleIcon,
} from "./styles";
import CustomModal from "../../common/modal";
import TextEditor from "../../common/textEditor";
import Tags from "../../common/tags";

const FeedShare = () => {
  const { themeName } = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Panel>
      <Container>
        <Tooltip
          title="Write a new post"
          placement="bottom"
          arrow
          classes={{ tooltip: classes.tooltip }}
        >
          <div onClick={() => setOpen(true)} className="write">
            <WriteIcon />
            <span>Start a post</span>
          </div>
        </Tooltip>
        <div className="attachment">
          <Tooltip
            title="Add a photo to the post"
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <Button disabled={true} type="button">
              <CameraIcon />
              Photo
            </Button>
          </Tooltip>

          <Tooltip
            title="Add a file to the post"
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <Button disabled type="button">
              <DocumentIcon />
              {themeName === "old" ? "Document" : "Event"}
            </Button>
          </Tooltip>
          <Tooltip
            title="Write an article"
            placement="bottom"
            arrow
            classes={{ tooltip: classes.tooltip }}
          >
            <Button disabled type="button">
              <ArticleIcon />
              Write article
            </Button>
          </Tooltip>
        </div>
      </Container>

      <CustomModal height={"80vh"} open={open} handleClose={handleClose}>
        <Tags />
        <br />
        <br />
        <TextEditor />
        <br />
        <br />
        <br />
        <br />
        <br />
        dfdsf afdasdfasdf <br />
        adsfaf dfafasdf
        <br />
      </CustomModal>
    </Panel>
  );
};

export default FeedShare;
