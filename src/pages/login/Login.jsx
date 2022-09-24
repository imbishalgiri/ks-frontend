import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/authSlices";
import CustomModal from "../../components/common/modal";
import "./styles.css";
import EmailChange from "./emailChange";
import AxiosInstance from "../../apis/axios";

const Login = () => {
  const [forgotPasswordModal, setForgetPasswordModal] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [pwdChangeModal, setPwdChangeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
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
    if (token) navigate("/");
  }, [token]);
  useEffect(() => {
    isLoggedIn && toast.success("succesfully logged in");
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const handleEmailSave = () => {
    setIsLoading(true);
    AxiosInstance.post("auth/send-mail", { email })
      .then((res) => {
        setForgetPasswordModal(false);
        setCodeModal(true);
        toast.success("Please check your email for confirmation code");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error);
        setIsLoading(false);
      });
  };
  const handleCodeSave = () => {
    setIsLoading(true);
    AxiosInstance.post("/auth/confirm-code", { email, code })
      .then((res) => {
        setCodeModal(false);
        setPwdChangeModal(true);
        toast.success("Code Verified, Now set your new password");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setIsLoading(false);
      });
  };
  const handlePasswordSave = () => {
    setIsLoading(true);
    AxiosInstance.post("/auth/change-password", { email, password })
      .then((res) => {
        setPwdChangeModal(false);
        toast.success("Password Changed! login with your new password.");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <small
            style={{
              color: "#444fa9",
              alignSelf: "flex-start",
              marginTop: "-15px",
              fontSize: "11px",
              cursor: "pointer",
            }}
            onClick={() => setForgetPasswordModal(true)}
          >
            Forgot password?
          </small>

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
      <CustomModal
        width={"40vw"}
        height={"40vh"}
        open={forgotPasswordModal}
        headerText="Email To Change Password"
        handleClose={() => {
          setForgetPasswordModal(false);
          setEmail("");
          setIsLoading(false);
        }}
        isLoading={isLoading}
        onSave={handleEmailSave}
      >
        <EmailChange
          onEmailChange={(data) => setEmail(data)}
          setIsLoading={setIsLoading}
        />
      </CustomModal>
      <CustomModal
        width={"40vw"}
        height={"40vh"}
        open={codeModal}
        headerText="Verification Code here"
        handleClose={() => {
          setCodeModal(false);
          setCode("");
          setIsLoading(false);
        }}
        isLoading={isLoading}
        onSave={handleCodeSave}
      >
        <EmailChange
          onEmailChange={(data) => setCode(data)}
          setIsLoading={setIsLoading}
          label={"Enter Your Verification Code"}
        />
      </CustomModal>
      <CustomModal
        width={"40vw"}
        height={"40vh"}
        open={pwdChangeModal}
        headerText="New Password Here"
        handleClose={() => {
          setPwdChangeModal(false);
          setIsLoading(false);
          setPassword("");
        }}
        isLoading={isLoading}
        onSave={handlePasswordSave}
      >
        <EmailChange
          onEmailChange={(data) => setPassword(data)}
          setIsLoading={setIsLoading}
          label={"Enter Your New Password"}
        />
      </CustomModal>
    </>
  );
};

export default Login;
