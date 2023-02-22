import React from "react";

// -- Material UI
import Container from "@mui/material/Container";

// -- Components
import { Header } from "../components";

// -- React-redux

import { useDispatch } from "react-redux";

// -- Redux state
import { fetchAuthMe } from "../redux/slices/auth";
import { setIsMobile } from "../redux/slices/utils";
import { AllRoutes } from "./routes";

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const [width, setWidth] = React.useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  React.useEffect(() => {
    width <= 768 ? dispatch(setIsMobile(true)) : dispatch(setIsMobile(false));
  }, [width])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <AllRoutes />
      </Container>
    </>
  );
}

export default App;
