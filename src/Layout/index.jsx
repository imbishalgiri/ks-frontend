import React, { useState, useEffect } from "react";

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
import { cleanAuth } from "../redux/authSlices";
import { getAllPosts } from "../redux/postSlices";
import Appbar from "../components/appbar";

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
  const { changeTheme, themeName } = useTheme();
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: postData, loading: postLoading } = useSelector(
    (state) => state.post.get.allPosts
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    dispatch(getAllPosts());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ks-user-token");
    dispatch(cleanAuth());
    navigate("/login");
  };

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
      <Appbar />
      {/* </div> */}

      <main style={{ marginTop: "100px" }}>
        <LeftColumn isLoading={false} />
        <MiddleColumn isLoading={postLoading} postData={postData} />
        <RightColumn isLoading={false} />
      </main>
    </Container>
  );
};

export default Layout;
