import React from "react";

// -- Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
                <Link to={`/profile/${user?._id}`}>
                  <Typography
                    style={{
                      cursor: "pointer",
                      marginRight: 20,
                      color: "black",
                    }}
                    className={styles.profileName}
                    variant="h7"
                  >
                    {user?.fullName}
                  </Typography>
                </Link>
                {user.rank === "admin" ? (
                  <Link to="/admin-panel">
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ boxShadow: 1 }}
                    >
                      Админ панель
                    </Button>
                  </Link>
                ) : (
                  ""
                )}

                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/login">
                  <Button
                    style={{ boxShadow: 0 }}
                    onClick={onClickLogout}
                    variant="contained"
                    color="error"
                  >
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
