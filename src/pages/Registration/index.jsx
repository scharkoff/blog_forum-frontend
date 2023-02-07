import React from "react";

// -- Material UI
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

// -- React-redux
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// -- Redux state
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

// -- Imports styles
import styles from "./Login.module.scss";
import { AlertMessage } from "../../components/AlertMessage";

export const Registration = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Авторизирован или нет
  const isAuth = useSelector(selectIsAuth);

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- Настройки и работа с формой
  const { register, handleSubmit, setError, formState, getValues } = useForm({
    defaultValues: {
      rank: "user",
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // -- Валидация почты для отображения ошибки в поле
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField.value) === false) {
      return false;
    }

    return true;
  }

  // -- Обработка клика по кнопке "Зарегистрироваться"
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

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
      setAlertText("Вы успешно зарегистрировались!");
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
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <Paper elevation={0} classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="Полное имя"
            fullWidth
            {...register("fullName", { required: "Введите имя" })}
            helperText={formState.errors.fullName?.message}
            error={Boolean(formState.errors.fullName?.message)}
          />
          <TextField
            className={styles.field}
            label="E-Mail"
            fullWidth
            {...register("email", { required: "Укажите почту" })}
            helperText={formState.errors.email?.message}
            error={Boolean(formState.errors.email?.message)}
          />
          <TextField
            type="password"
            className={styles.field}
            label="Пароль"
            fullWidth
            {...register("password", { required: "Введите пароль" })}
            helperText={formState.errors.password?.message}
            error={Boolean(formState.errors.password?.message)}
          />
          <Button
            disabled={!formState.isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </div>
  );
};
