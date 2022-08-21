import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import { useTheme } from "./hooks";

import Layout from "./Layout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import GlobalStyles from "./styles/GlobalStyles";
import { themes } from "./styles/themes";

const App = () => {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];

  return (
    <div className="App">
      <ThemeProvider theme={currentTheme}>
        <Layout />
        <GlobalStyles />
    </ThemeProvider>
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
    </Routes>
    </div>

  );
};

export default App;
