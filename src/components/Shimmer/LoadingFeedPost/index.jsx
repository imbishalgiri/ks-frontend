import React from "react";

import Panel from "../../Panel";
import Skeleton from "../../Skeleton";

import { Container } from "./styles";

const LoadingFeedPost = ({ num = 0 }) => {
  const ske = [];
  for (let i = 0; i < num; i++) {
    ske.push(<Skeleton className="row-skeleton" />);
  }
  return (
    <Container>
      <Panel className="no-shadow">
        <header>
          <Skeleton className="avatar-skeleton" />
          <div className="column">
            <Skeleton className="row-skeleton" />
            <Skeleton className="row-skeleton" />
          </div>
        </header>
        <span>
          <Skeleton className="row-skeleton" />
          <Skeleton className="row-skeleton" />
          {ske}
        </span>
      </Panel>
    </Container>
  );
};

export default LoadingFeedPost;
