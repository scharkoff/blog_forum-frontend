import React from "react";

// -- Material UI
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// -- React-redux
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// -- Redux store
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

// -- Styles
import styles from "./Login.module.scss";

export const Login = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Авторизирован или нет
  const isAuth = useSelector(selectIsAuth);

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- Настройки и работа с формой
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // -- Обработка клика по кнопке "Авторизоваться"
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    if (data.payload.isError) {
      setAlertText(
        data.payload.message ? data.payload.message : data.payload[0].msg
      );
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Вы успешно авторизовались!");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Если авторизировался, перебросить на главный экран
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Alert
        style={{ display: !open ? "none" : "flex", marginBottom: 20 }}
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertText}
      </Alert>
      <Paper elevation={0} classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(formState.errors.email?.message)}
            helperText={formState.errors.email?.message}
            {...register("email", { required: "Укажите почту" })}
            fullWidth
          />
          <TextField
            type="password"
            className={styles.field}
            label="Пароль"
            error={Boolean(formState.errors.password?.message)}
            fullWidth
            {...register("password", { required: "Введите пароль" })}
            helperText={formState.errors.password?.message}
          />
          <Button
            disabled={!formState.isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};
