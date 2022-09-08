import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { ThemeProvider } from "styled-components";

import { useTheme } from "./hooks";

import Layout from "./Layout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import GlobalStyles from "./styles/GlobalStyles";
import { themes } from "./styles/themes";

import SinglePost from "./pages/post";
import { addUser } from "./redux/authSlices";
import { useDispatch } from "react-redux";
import { SocketContext, socket } from "./context/socket";
import Protected from "./components/protected";
import UserProfile from "./pages/userProfile";
import AdminArea from "./pages/adminArea";
import Initial from "./pages/initial";

const App = () => {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];
  const dispatch = useDispatch();

  const token = localStorage.getItem("ks-user-token");
  if (token) dispatch(addUser(jwtDecode(token)?.user));

  return (
    <ThemeProvider theme={currentTheme}>
      <SocketContext.Provider value={socket}>
        <GlobalStyles />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* ---------------- */}
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Layout />
              </Protected>
            }
          />
          {/* ------------------ */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Layout />
              </Protected>
            }
          />
          {/* --------------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* --------------------- */}
          <Route
            path="/dashboard/:id"
            element={
              <Protected>
                <SinglePost />
              </Protected>
            }
          />
          {/* --------------------- */}
          <Route
            path="/profile/:id"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          />
          {/* --------------------- */}
          <Route
            path="/admin"
            element={
              <Protected>
                <AdminArea />
              </Protected>
            }
          />
          {/* --------------------- */}
          <Route path="/initial" element={<Initial />} />
          {/* --------------------- */}
        </Routes>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default App;
