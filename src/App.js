import React from "react";

// -- Material UI
import Container from "@mui/material/Container";

// -- Components
import { Header } from "./components";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  Profile,
  AdminPanel,
  EditUserData,
} from "./pages";

// -- React-redux
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

// -- Redux state
import { fetchAuthMe } from "./redux/slices/auth";
import { setIsMobile } from "./redux/slices/utils";

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
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/posts/:id" element={<FullPost />}></Route>
          <Route path="/posts/:id/edit" element={<AddPost />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
          <Route path="/tags/:name" element={<Home />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/admin-panel" element={<AdminPanel />}></Route>
          <Route
            path="/admin-panel/edit-user/:id"
            element={<EditUserData />}
          ></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
