import React from "react";


import Container from "@mui/material/Container";


import { useDispatch } from "react-redux";


import { fetchAuthMe } from "redux/slices/auth";
import { setIsMobile } from "redux/slices/utils";
import { AllRoutes } from "./routes";
import { Header } from "modules/Header";

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
