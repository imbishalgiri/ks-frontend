/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from "react";

import kFormatter from "../../../utils/kFormatter";
import openPage from "../../../utils/openPage";

import Panel from "../../Panel";

import { Container, SaveIcon } from "./styles";

const ProfilePanel = () => {
  const viewed = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );
  const post = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );

  return (
    <Panel>
      <Container>
        <div className="premium-border" />
        <div className="profile-cover" />
        <img
          src="https://github.com/leoronne.png"
          alt="Avatar"
          className="profile-picture"
          onClick={() => openPage("in/leoronne")}
        />
        <h1>Ks User</h1>
        <h2>Be.Software 8th semester</h2>

        <div className="separator" />

        <div className="key-value">
          <span className="key">Views of your post</span>
          <span className="value">{post}</span>
        </div>
        <div className="separator" />
        <div className="saved-items" onClick={() => openPage("feed/saved")}>
          <SaveIcon />
          <span>Pinned Posts</span>
        </div>
      </Container>
    </Panel>
  );
};

export default ProfilePanel;
