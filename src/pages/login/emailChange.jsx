import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import usestyles from "./style";

const PasswordChange = ({ onEmailChange, label = "" }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const classes = usestyles();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "150px",
      }}
    >
      <TextField
        style={{ width: "300px" }}
        variant="outlined"
        label={label || "Enter your email here"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          onEmailChange(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordChange;
