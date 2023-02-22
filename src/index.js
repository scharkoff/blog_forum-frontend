import React from "react";

// -- React-redux
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// -- Styles
import "./index.scss";
import { theme } from "./theme";

// -- MaterialUI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

// -- Redux state
import store from "./redux/store";
import App from "./app/App";

// -- root
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
