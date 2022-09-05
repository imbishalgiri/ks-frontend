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

const App = () => {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];
  const dispatch = useDispatch();

  const token = localStorage.getItem("ks-user-token");
  if (token) dispatch(addUser(jwtDecode(token)?.user));

  return (
    <ThemeProvider theme={currentTheme}>
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

      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/dashboard" element={<Layout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:id" element={<SinglePost />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
