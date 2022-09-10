import React, { useState, useEffect, useCallback } from "react";

import { useTheme } from "../hooks";

import {
  DesktopHeader,
  AdBanner,
  LeftColumn,
  MiddleColumn,
  RightColumn,
} from "../components";

import { Container, VersionIcon } from "./styles";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, getNotice } from "../redux/authSlices";
import { addPostStatic, getAllPosts } from "../redux/postSlices";
import Appbar from "../components/appbar";
import { useRef } from "react";
import AxiosInstance from "../apis/axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = () => {
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useRef();
  const [search, setSearch] = useState("");
  const { user, meRefresh } = useSelector((state) => state?.auth);
  const { data: postData, loading: postLoading } = useSelector(
    (state) => state.post.get.allPosts
  );
  let page = 1;

  const handleMoreLoad = (page) => {
    setFetching(true);
    AxiosInstance.get("/posts", { params: { page: page, limit: 3 } })
      .then((data) => {
        dispatch(addPostStatic(data?.data?.data));
        setFetching(false);
      })
      .catch((err) => {
        toast.error("could not load more data");
        setFetching(false);
      });
  };

  useEffect(() => {
    user?._id && dispatch(getMe(user?._id));
  }, [user?._id, meRefresh]);

  useEffect(() => {
    dispatch(getNotice());
  }, []);

  useEffect(() => {
    dispatch(getAllPosts({ page: 0, limit: 3, title: search }));
  }, [search]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        handleMoreLoad(page++);
      }
    },
    [postLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <Container>
      <DesktopHeader />

      {/* <div className={classes.root}> */}
      {/* <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FaHamburger />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar> */}
      <Appbar setSearchValue={handleSearch} />
      {/* </div> */}

      <main style={{ marginTop: "100px" }}>
        <LeftColumn isLoading={false} />
        <MiddleColumn
          isLoading={postLoading}
          postData={postData}
          fetching={fetching}
          ref={loader}
        />
        <RightColumn isLoading={false} />
      </main>
    </Container>
  );
};

export default Layout;
