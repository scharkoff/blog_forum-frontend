import React from "react";

// -- Material UI
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// -- React-redux
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// -- Redux store
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

// -- Styles
import styles from "./Login.module.scss";
import { AlertMessage } from "../../components/AlertMessage";

export const Login = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmitAuth = async (values) => {
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

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <Paper elevation={0} classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmitAuth)}>
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
