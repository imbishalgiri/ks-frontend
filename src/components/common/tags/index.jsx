import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useStyles } from "../../../styles/MaterialUI";
import usestyles from "./styles";

const SingleTag = ({ id, value, onDelete }) => {
  return (
    <span
      style={{
        margin: "0 3px",
        padding: "8px 10px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
        fontSize: "17px",
      }}
    >
      {value && (
        <>
          <span>{value}</span>
          <GrClose cursor={"pointer"} onClick={() => onDelete(id)} />
        </>
      )}
    </span>
  );
};

const Tags = ({ onSpaceHit }) => {
  const [tags, setTags] = useState([]);
  const [formInput, setFormInput] = useState("");
  const styles = usestyles();

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormInput(e.target.value);
    if (e.code === "Space") {
      if (tags.length < 3) {
        const newTags = [
          ...tags,
          { id: tags.length + 1, value: `#${e.target.value.trim()}` },
        ];
        // handeling locally
        setTags(newTags);
        // sending to the parent
        onSpaceHit(newTags);
      }

      setFormInput("");
    }
  };

  const handleDelete = (id) => {
    const filteredTags = tags.filter((el) => el.id !== id);
    setTags(filteredTags);
    // deleting from the parent state
    onSpaceHit(filteredTags);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-tags">Tags</InputLabel>
      <OutlinedInput
        id="outlined-adornment-tags"
        type="text"
        value={formInput}
        onChange={handleChange}
        onKeyDown={handleChange}
        style={{ width: "530px" }}
        startAdornment={
          tags.length > 0 && (
            <InputAdornment position="start">
              {tags.map((tag, index) => {
                return (
                  index < 3 && (
                    <SingleTag
                      key={tag.id}
                      id={tag.id}
                      value={tag.value}
                      onDelete={handleDelete}
                      onClick={() => handleDelete(tag.id)}
                    />
                  )
                );
              })}
            </InputAdornment>
          )
        }
        label="tags"
      />
    </FormControl>
  );
};

export default Tags;
