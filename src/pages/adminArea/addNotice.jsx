import {
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

const AddNotice = ({ parentSubmit }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [fac, setFac] = useState("Software Engineering");

  // change effect
  useEffect(() => {
    parentSubmit({ image, description, audience: fac });
  }, [fac, image, description]);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Typography>Choose Image</Typography>
        <input type={"file"} onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div>
        <Typography>Choose Faculty</Typography>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={fac}
          onChange={(e) => setFac(e.target.value)}
          variant={"outlined"}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Software Engineering"}>
            Software Engineering
          </MenuItem>
          <MenuItem value={"Computer Engineering"}>
            Computer Engineering
          </MenuItem>
          <MenuItem value={"IT Engineering"}>IT Engineering</MenuItem>
          <MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
          <MenuItem value={"Electrical Engineering"}>
            Electrical Engineering
          </MenuItem>
          <MenuItem value={"BCA"}>BCA</MenuItem>
        </Select>
      </div>

      <div style={{ marginLeft: "32px" }}>
        <Typography>Add description:</Typography>
        <TextareaAutosize
          style={{
            padding: "10px",
            backgroundColor: "#dadada",
            border: "1px solid #000",
          }}
          minRows={3}
          placeholder="Add Description Here..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddNotice;
