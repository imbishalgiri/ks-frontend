import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "styled-components";

import { useTheme } from "./hooks";

import Layout from "./Layout";

import GlobalStyles from "./styles/GlobalStyles";
import { themes } from "./styles/themes";

const App = () => {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <Layout />
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
    </ThemeProvider>
  );
};

export default App;
