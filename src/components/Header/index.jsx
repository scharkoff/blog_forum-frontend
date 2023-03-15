import React, { useEffect, useState } from "react";

// -- Material UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// -- Styles
import styles from "./Header.module.scss";

// -- React-Redux
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// -- Redux state
import { fetchPosts } from "../../redux/slices/posts";
import { fetchActiveTag } from "../../redux/slices/tags";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { resetSearchString } from "../../redux/slices/utils";
import { Avatar, IconButton } from "@mui/material";

export const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const user = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти из акккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link
            onClick={() => {
              dispatch(fetchPosts());
              dispatch(fetchActiveTag(null));
              dispatch(resetSearchString(new Date().valueOf()));
            }}
            className={styles.logo}
            to="/"
          >
            <div>SHARKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={`/profile/${user?._id}`} style={{ marginLeft: 10 }}>
                  {user ? (
                    <Avatar
                      src={`${
                        process.env.REACT_APP_API_URL || "http://localhost:4444"
                      }${user.avatarUrl}`}
                      variant="rounded"
                      sx={
                        !isMobile
                          ? { width: 36, height: 36 }
                          : { width: 32, height: 32 }
                      }
                    />
                  ) : (
                    ""
                  )}
                </Link>
                {user.rank === "admin" ? (
                  <Link to="/admin-panel" style={{ marginLeft: 10 }}>
                    <Button variant="contained" color="secondary">
                      <AdminPanelSettingsIcon
                        fontSize={!isMobile ? "medium" : "small"}
                      />
                    </Button>
                  </Link>
                ) : (
                  ""
                )}

                <Link to="/add-post" style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    startIcon={!isMobile ? <AddIcon fontSize="small" /> : ""}
                  >
                    {!isMobile ? "Создать" : <AddIcon fontSize="small" />}
                  </Button>
                </Link>
                <Link to="/login" style={{ marginLeft: 10 }}>
                  <Button
                    onClick={onClickLogout}
                    variant="contained"
                    color="error"
                  >
                    <LogoutIcon fontSize={!isMobile ? "medium" : "small"} />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ marginLeft: 10 }}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register" style={{ marginLeft: 10 }}>
                  <Button variant="contained">Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
