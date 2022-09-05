import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlices";
import "./styles.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isLoggingIn } = useSelector((state) => state.auth);

  const token = localStorage.getItem("ks-user-token");

  useEffect(() => {
    if (token && isLoggedIn) navigate("/");
  }, [token, isLoggedIn]);

  console.log("error ->", errors);
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          my={2}
        >
          <Box
            style={{
              backgroundColor: "#4250af",
              color: "#fff",
              margin: "20px 0 30px 0",
              padding: "20px",
              borderRadius: "10px 10px 0 0",
            }}
          >
            Welcome to login of KS
          </Box>

          <TextField
            type="text"
            placeholder="itsme@gmail.com"
            variant="outlined"
            className="input-field"
            label="email"
            name="email"
            error={errors?.email ? true : false}
            helperText={
              (errors?.email &&
                errors?.email?.type === "required" &&
                "this is required field") ||
              (errors?.email &&
                errors?.email?.type === "pattern" &&
                "Email format invalid")
            }
            inputRef={register({
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="password"
            type="password"
            label="password"
            placeholder="password"
            variant="outlined"
            className="input-field"
            error={errors?.password}
            helperText={
              (errors?.password &&
                errors?.password?.type === "required" &&
                "This is required field") ||
              (errors?.password &&
                errors?.password?.type === "minLength" &&
                "Minimum character of length 4 is required")
            }
            inputRef={register({
              required: true,
              minLength: 4,
            })}
          />
        </Box>
        <Button
          type="submit"
          style={{
            backgroundColor: "#4250af",
            color: "#fff",
            margin: "10px 0",
            padding: "10px 20px",
            borderRadius: "0 0 10px 10px",
            width: "100%",
          }}
        >
          {!isLoggingIn && "Login"}
          {isLoggingIn && <CircularProgress color="#fff" size={"25px"} />}
        </Button>
      </form>
    </div>
  );
};

export default Login;
