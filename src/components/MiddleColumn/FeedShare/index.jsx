import React, { useState } from "react";
import {
  Tooltip,
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@material-ui/core";
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
import UploadComponent from "../../common/dnd";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../../../redux/postSlices";
import { useEffect } from "react";

const FeedShare = () => {
  const { themeName } = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // these are the states to be sent to the server
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const {
    create: { loading, created },
  } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const isValid = title && `${category}` && description.length > 7;

  const fileTypes = ["JPEG", "PNG", "GIF"];
  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleCategoriesChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setTags([]);
    setTitle("");
    setDescription("");
    setFile(null);
    setCategory("");
  };

  useEffect(() => {
    created && handleClose();
  }, [created]);

  console.log("description", description);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file?.[0]);
    formData.append("description", description);
    tags.forEach((singleTag) => {
      formData.append("tags[]", singleTag.value);
    });
    formData.append("category", category.value);
    formData.append("user", "62a5c151f5d5cab29da71368");
    dispatch(addPost(formData, handleClose));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

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

      <CustomModal
        headerText={"Post anything thats on your mind"}
        height={"80vh"}
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit}
        disabled={!isValid}
        isLoading={loading}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Tags onSpaceHit={handleTagsChange} />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Categories"
                onChange={handleCategoriesChange}
              >
                <MenuItem value={10}>Science</MenuItem>
                <MenuItem value={20}>Design</MenuItem>
                <MenuItem value={30}>Programming</MenuItem>
                <MenuItem value={30}>Technology</MenuItem>
                <MenuItem value={30}>Literature</MenuItem>
                <MenuItem value={30}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box style={{ marginBottom: "4px" }}>Image *</Box>
            <FileUploader
              multiple={true}
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
              minSize={"100%"}
            />
            {file?.[0] && <small>{file[0].name}</small>}
          </Grid>

          <Grid item xs={6}>
            <br />
            <TextField
              required
              fullWidth
              variant="outlined"
              label={"Title"}
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <TextEditor handleDescriptionChange={handleDescriptionChange} />
      </CustomModal>
    </Panel>
  );
};

export default FeedShare;
