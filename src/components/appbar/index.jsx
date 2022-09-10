import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useCallback, useState } from "react";
import {
  FaBookOpen,
  FaBookReader,
  FaBrain,
  FaHamburger,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanAuth } from "../../redux/authSlices";

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
  input: {
    color: "#fff",
  },
}));

const Appbar = ({ setSearchValue = null }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [search, setSearch] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("ks-user-token");
    dispatch(cleanAuth());
    navigate("/login");
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(args);
      }, timeout);
    };
  };
  const handleChange = (search) => {
    setSearch(search);
    setSearchValue(search);
  };
  const optimizedFn = useCallback(debounce(handleChange), []);
  console.log("search", search);
  return (
    <AppBar
      style={{
        position: "fixed",
        zIndex: "1000 !important",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          style={{ margin: "0 20px" }}
          color="inherit"
          aria-label="menu"
          onClick={() => navigate("/")}
        >
          <FaBrain size={"40px"} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Knowledge Seekers
        </Typography>
        {setSearchValue && (
          <div style={{ marginRight: "30vw", display: "flex" }}>
            <TextField
              style={{
                border: "1px solid #fff",
                marginLeft: "20px",
                width: "200px",
                height: "32px",
              }}
              onChange={(e) => optimizedFn(e.target.value)}
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch style={{ margin: "0 5px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
        {user.role === "admin" ? (
          <Button
            onClick={() => navigate("/admin")}
            style={{ marginRight: "50px", color: "#fff" }}
            startIcon={<FaUser />}
          >
            Go to admin
          </Button>
        ) : (
          ""
        )}

        <Button
          style={{
            textTransform: "none",
            background: "#ddd",
            color: "#4250af",
            height: "40px",
          }}
          onClick={handleLogout}
          color="inherit"
        >
          Logout
          <IconButton>
            <FaSignOutAlt color="#4250af" />
          </IconButton>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
