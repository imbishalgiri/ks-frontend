import React from "react";

import LoadingTrendingPanel from "../Shimmer/LoadingTrendingPanel";
import TrendingPanel from "./TrendingPanel";

import { Container } from "./styles";

const RightColumn = ({ isLoading }) => {
  return (
    <Container className="right-column">
      {isLoading ? (
        <LoadingTrendingPanel />
      ) : (
        <>
          <TrendingPanel />
        </>
      )}
    </Container>
  );
};

export default RightColumn;
