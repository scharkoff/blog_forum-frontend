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
import { fetchActiveTag, fetchPosts } from "../../redux/slices/posts";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Проверка на авторизацию
  const isAuth = useSelector(selectIsAuth);

  // -- User data
  const user = useSelector((state) => state.auth.data);

  // -- Обработка клика по кнопке "Выйти"
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
                    variant="h7"
                  >
                    {user?.fullName}
                  </Typography>
                </Link>
                {user.rank === "admin" ? (
                  <Link to="/admin-panel">
                    <Button variant="contained" color="secondary">
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
