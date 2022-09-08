import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  FaBookOpen,
  FaBookReader,
  FaBrain,
  FaHamburger,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
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
}));

const Appbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("ks-user-token");
    dispatch(cleanAuth());
    navigate("/login");
  };
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

        <Button
          onClick={() => navigate("/admin")}
          style={{ marginRight: "50px", color: "#fff" }}
          startIcon={<FaUser />}
        >
          Go to admin
        </Button>

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
