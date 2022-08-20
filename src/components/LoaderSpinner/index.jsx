import React from "react";
import { CircularProgress } from "@material-ui/core";

import { Container } from "./styles";

const Loader = ({ color = "#0099e8" }) => {
  return (
    <Container className="loader-container">
      <CircularProgress size={15} style={{ color }} />
    </Container>
  );
};
export default Loader;
