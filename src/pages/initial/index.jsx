import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowCircleRight, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../apis/axios";
import Appbar from "../../components/appbar";
import { login } from "../../redux/authSlices";

const Initial = () => {
  const [password, setPassword] = useState("");
  const [selectedCat, setSelectedCat] = useState([]);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { user, isLoggedIn, isLoggingIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategorySelect = (el) => {
    if (selectedCat?.indexOf(el) === -1) {
      return setSelectedCat([...selectedCat, el]);
    }
    setSelectedCat(selectedCat.filter((data) => data !== el));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!user.isBrandNew) navigate("/");
  });

  useEffect(() => {
    if (isLoggedIn && isUpdated) {
      handleNavigate();
    }
  }, [isLoggedIn, isLoggingIn]);

  const handleSubmit = () => {
    if (password.length < 6) return;
    if (selectedCat.length < 2) {
      return toast.info("please select at least 2 categories");
    }
    setLoading(true);
    AxiosInstance.put("/users/update", {
      likedCategories: selectedCat,
      isBrandNew: false,
      password: password,
      _id: user?._id,
    })
      .then((res) => {
        toast.success("redirecting to homepage ... ");
        setLoading(false);
        setIsUpdated(true);
        dispatch(login({ email: user?.email, password: password }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error("error updating info.");
      });
  };

  if (isLoggedIn && isUpdated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Appbar />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#525486", marginTop: "200px" }}
        >
          Welcome to our platform {user.firstName}!{" "}
        </Typography>
        <Typography>
          <Typography>
            As you are <strong style={{ margin: "0 5px" }}>First Time</strong>{" "}
            to the app, please fill up following details.
          </Typography>
        </Typography>

        <Box style={{ marginTop: "80px", width: "500px" }}>
          <div>
            <Typography>
              set up your password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: "100%", marginTop: "5px" }}
              label={"password"}
              variant={"outlined"}
              type={showPassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={password.length && password.length < 6}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            {password.length && password.length < 6 ? (
              <small style={{ color: "red" }}>
                make password at least 6 digits long
              </small>
            ) : (
              ""
            )}
            <br />
            <br />
            <div>
              <Typography variant="h6">
                select your intrest{" "}
                {selectedCat.length < 2 ? (
                  <small
                    style={{
                      marginRight: "5px",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    2 at least*
                  </small>
                ) : (
                  ""
                )}
              </Typography>

              {[
                "Science",
                "Design",
                "Programming",
                "Technology",
                "Literature",
                "Photography",
                "Others",
              ].map((el) => {
                return (
                  <div style={{ margin: "30px 0" }}>
                    <span
                      onClick={() => handleCategorySelect(el)}
                      style={{
                        background: `${
                          selectedCat.indexOf(el) !== -1 ? "#3b3978" : "#6461c2"
                        }`,
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "100px",
                        cursor: "pointer",
                      }}
                    >
                      {el}
                    </span>
                    {selectedCat.indexOf(el) !== -1 ? (
                      <FaCheck style={{ color: "green", marginLeft: "20px" }} />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <Button
              style={{
                marginTop: "30px",
                width: "100%",
                height: "50px",
                textTransform: "none",
              }}
              variant="contained"
              color="primary"
              endIcon={!loading && <FaArrowCircleRight />}
              onClick={handleSubmit}
            >
              {!loading && "Continue"}
              {loading && <CircularProgress color="#fff" />}
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Initial;
