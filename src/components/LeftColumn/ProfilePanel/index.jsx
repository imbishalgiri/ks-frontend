/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import kFormatter from "../../../utils/kFormatter";
import openPage from "../../../utils/openPage";

import Panel from "../../Panel";

import { Container, SaveIcon } from "./styles";

const ProfilePanel = () => {
  const navigate = useNavigate();
  const post = useMemo(
    () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
    []
  );

  const { user } = useSelector((state) => state?.auth);

  return (
    <div style={{ top: "80px", position: "sticky" }}>
      <Panel>
        <Container>
          <div className="title">
            <div className="premium-border" />
            <div className="profile-cover" />
            <img
              src={`${
                user?.avatar ||
                "https://placehold.jp/626c62/ffffff/150x150.png?text=KS%20USER"
              }`}
              alt="Avatar"
              className="profile-picture"
              onClick={() => navigate(`/profile/${user?._id}`)}
            />
            <h1>{user?.firstName + " " + user?.lastName}</h1>
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
          </div>
        </Container>
      </Panel>
      <Panel style={{ marginTop: "30px", padding: "20px" }}>Hi there</Panel>
    </div>
  );
};

export default ProfilePanel;
