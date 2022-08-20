import { Input, InputAdornment } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

const SingleTag = ({ id, value, onDelete }) => {
  return (
    <span
      style={{
        background: "#fff",
        margin: "0 3px",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
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

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [formInput, setFormInput] = useState("");

  console.log("tags -->", tags);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormInput(e.target.value);
    if (e.code === "Space") {
      setTags([
        ...tags,
        { id: tags.length + 1, value: `#${e.target.value.trim()}` },
      ]);
      setFormInput("");
    }
  };

  const handleDelete = (id) => {
    setTags(tags.filter((el) => el.id !== id));
  };

  return (
    <Input
      style={{ height: "50px", borderBottom: "none", border: "2px solid #000" }}
      label="tags"
      onChange={handleChange}
      value={formInput}
      onKeyDown={handleChange}
      startAdornment={
        <InputAdornment position="start">
          {tags.map((tag) => (
            <SingleTag
              key={tag.id}
              id={tag.id}
              value={tag.value}
              onDelete={handleDelete}
            />
          ))}
        </InputAdornment>
      }
      variant={"outlined"}
    />
  );
};

export default Tags;
