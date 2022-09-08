import React from "react";

import LoadingFeedShare from "../Shimmer/LoadingFeedShare";
import LoadingFeedPost from "../Shimmer/LoadingFeedPost";
import FeedShare from "./FeedShare";
import FeedPost from "./FeedPost";

import twitter from "../../assets/img/twitter.png";
import facebook from "../../assets/img/facebook.png";
import rocketseat from "../../assets/img/rocketseat.png";

import { Container, DownIcon } from "./styles";
import { getTimeDiff } from "../../utils/utilities";
import moment from "moment/moment";

const MiddleColumn = ({ isLoading, postData = [] }) => {
  console.log("post data inside -->", postData);
  return (
    <Container className="middle-column">
      {isLoading && !postData?.length ? (
        <>
          <LoadingFeedShare />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
        </>
      ) : (
        <>
          <FeedShare />
          {postData?.length === 0 ? (
            "Nothing to show for you"
          ) : (
            <>
              <div className="seprator">
                <div className="line" />
                {/* <span>
                  Sort by:
                  <strong> Top</strong>
                </span>
                <DownIcon /> */}
              </div>
              {postData?.map((data) => {
                return (
                  <FeedPost
                    avatar={`${
                      data?.user?.avatar ||
                      "https://placehold.jp/626c62/ffffff/150x150.png?text=KS%20USER"
                    }`}
                    user={
                      data?.user?.firstName + " " + data?.user?.lastName ||
                      "Unknown User"
                    }
                    title="Front-end Developer at Memed"
                    image={data.image || ""}
                    allLikes={data.likes}
                    allComments={data.comments}
                    key={data?._id}
                    post={data?._id}
                    time={moment(data?.createdAt)?.fromNow()}
                    userId={data?.user?._id}
                    postTitle={data?.title}
                  />
                );
              })}
              {/* <FeedPost
                avatar={rocketseat}
                user="Rocketseat"
                title="Educational institution"
              />
              <FeedPost avatar={facebook} user="Facebook" title="Company" />
              <FeedPost avatar={twitter} user="Twitter" title="Company" /> */}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default MiddleColumn;
