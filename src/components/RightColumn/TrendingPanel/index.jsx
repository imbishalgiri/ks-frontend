import React, { useMemo } from "react";
import { Tooltip, Typography } from "@material-ui/core";

import kFormatter from "../../../utils/kFormatter";

import Panel from "../../Panel";

import { useStyles } from "../../../styles/MaterialUI";
import { Container } from "./styles";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import CustomModal from "../../common/modal";

const TrendingPanel = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const { notice } = useSelector((state) => state.auth);

  const recommended = [
    "Product Management",
    "React",
    "TypeScript",
    "Frontend",
    "Next.js",
  ];

  return (
    <>
      <Container>
        {/* <Panel>
          <span className="title">Recommended topics</span>

          <ul>
            {recommended.map((topic) => {
              const readers = useMemo(
                () => kFormatter(Math.floor(Math.random() * (10000 - 1)) + 1),
                []
              );
              const day = useMemo(
                () => Math.floor(Math.random() * (7 - 1)) + 1,
                []
              );
              return (
                <li key={topic}>
                  <span className="bullet" />
                  <span className="news">
                    <Tooltip
                      title={`${readers} users engaged with this topic`}
                      placement="left"
                      arrow
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <span className="head">{topic}</span>
                    </Tooltip>
                    <span className="subtext">{`${day}d ago • ${readers} readers`}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel> */}
      </Container>
      <Container>
        <Panel>
          <span className="title">Notices For You</span>

          <ul>
            {notice?.map((topic) => {
              return (
                <li key={topic?._id} onClick={() => setModalOpen(topic)}>
                  <span className="bullet" />
                  <span className="news">
                    <Tooltip
                      title={`notice for you`}
                      placement="left"
                      arrow
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <span className="head">{topic?.description}</span>
                    </Tooltip>
                    <span className="subtext">
                      {moment(topic?.createdAt)?.fromNow()}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Container>
      <CustomModal
        headerText={
          "This notice was published on ( " +
          moment(modalOpen?.createdAt).format("MMM Do YYYY") +
          " )"
        }
        height={"90vh"}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        showFooter={false}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={modalOpen.image} style={{ width: "95%" }} />
          <div
            style={{
              backgroundColor: "#fff",
              width: "95%",
              marginTop: "20px",
              padding: "20px",
            }}
          >
            <Typography component={"span"} style={{ marginRight: "10px" }}>
              <strong>Description: </strong>
            </Typography>{" "}
            {modalOpen.description}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default TrendingPanel;
