import React from "react";
import ReactDOM from "react-dom";

import { LoaderSpinner } from "./components";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "./hooks";
import App from "./App";

ReactDOM.render(
  <React.Suspense fallback={<LoaderSpinner color="#0099e8" />}>
    <React.StrictMode>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </React.StrictMode>
  </React.Suspense>,
  document.getElementById("root")
);
