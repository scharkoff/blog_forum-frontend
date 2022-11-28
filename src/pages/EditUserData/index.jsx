import React from "react";

// -- Axios
import axios from "../../axios.js";

// -- Material UI
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

// -- Imports styles
import styles from "./EditUserData.module.scss";

// -- Table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// -- React-redux
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchEditUserData } from "../../redux/slices/users.js";

// -- Redux state
import {
  fetchUpdateUserAvatar,
  fetchUpdateUserEmail,
  fetchUpdateUserLogin,
  fetchUpdateUserPassword,
  fetchUpdateUserRank,
} from "../../redux/slices/auth.js";

export const EditUserData = () => {
  const dispatch = useDispatch();

  const editbleUserData = useSelector((state) => state.users.editbleUserData);

  // -- Актуальный тег
  const { id } = useParams();

  // -- Form settings hooks
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rank, setRank] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [newAvatarUrl, setNewAvatarUrl] = React.useState("");
  const [disableSaveButton, setDisableSaveButton] = React.useState(true);
  const [disableLoadButton, setDisableLoadButton] = React.useState(true);

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- useEffect
  React.useEffect(() => {
    if (editbleUserData) {
      setLogin(editbleUserData.login);
      setEmail(editbleUserData.email);
      setRank(editbleUserData.rank);
    }
  }, [editbleUserData]);

  const handleChangeRank = (event) => {
    setRank(event.target.value);
  };

  // -- Настройки и работа с формой логина
  const fullNameForm = useForm({
    defaultValues: {
      id,
      fullName: "",
    },
    mode: "onChange",
  });

  // -- Настройки и работа с формой почты
  const emailForm = useForm({
    defaultValues: {
      id,
      email: "",
    },
    mode: "onChange",
  });

  // -- Настройки и работа с формой пароля
  const passwordForm = useForm({
    defaultValues: {
      id,
      password: "",
    },
    mode: "onChange",
  });

  // -- Настройки и работа с формой аватара
  const avatarForm = useForm({
    defaultValues: {
      id,
      avatarUrl: "",
    },
    mode: "onChange",
  });

  // -- Настройки и работа с формой ранга
  const rankForm = useForm({
    defaultValues: {
      id,
      rank: "",
    },
    mode: "onChange",
  });

  // -- Обработка клика по кнопке "Сохранить изменения" на новый логин
  const onSubmitLogin = async (values) => {
    const data = await dispatch(fetchUpdateUserLogin(values));

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Логин пользователя успешно изменен");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Обработка клика по кнопке "Сохранить изменения" на новый пароль
  const onSubmitPassword = async (values) => {
    const data = await dispatch(fetchUpdateUserPassword(values));

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Пароль пользователя успешно изменен");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Обработка клика по кнопке "Сохранить изменения" на новый ранг
  const onSubmitRank = async (values) => {
    const data = await dispatch(fetchUpdateUserRank(values));

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Ранг пользователя успешно изменен");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Обработка клика по кнопке "Сохранить изменения" на новую почту
  const onSubmitEmail = async (values) => {
    const data = await dispatch(fetchUpdateUserEmail(values));

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Почта пользователя успешно изменена");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Валидация почты для отображения ошибки в поле
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField.value) === false) {
      return false;
    }

    return true;
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

      <Typography variant="h4" gutterBottom>
        Изменение данных пользователя
      </Typography>

      <form
        onSubmit={fullNameForm.handleSubmit(onSubmitLogin)}
        style={{ textAlign: "left" }}
      >
        <Grid container spacing={1} alignItems="center" marginTop={2}>
          <Grid item>
            <TextField
              {...fullNameForm.register("fullName", {
                required: "Введите новый логин!",
              })}
              variant="standard"
              placeholder="Введите новый логин..."
              label="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              helperText={fullNameForm.formState.errors.fullName?.message}
              error={Boolean(fullNameForm.formState.errors.fullName?.message)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={
                login === editbleUserData?.login || !login.length ? true : false
              }
              type="submit"
              size="small"
              variant="text"
              onClick={() => {
                const values = fullNameForm.getValues();
                if (values.fullName.length < 3) {
                  fullNameForm.setError("fullName", {
                    message: "Минимальная длина имени 3 символа!",
                  });
                }
              }}
            >
              Сохранить изменения
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
          <Grid item>
            <TextField
              {...emailForm.register("email", {
                required: "Введите новую почту!",
              })}
              variant="standard"
              placeholder="Введите новую почту..."
              label="Почта"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailForm.formState.errors.email?.message}
              error={Boolean(emailForm.formState.errors.email?.message)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={
                email === editbleUserData?.email || !email.length ? true : false
              }
              type="submit"
              size="small"
              variant="text"
              onClick={() => {
                const values = emailForm.getValues();
                if (validateEmail(values.email)) {
                  emailForm.setError("email", {
                    message: "Неверный формат почты!",
                  });
                }
              }}
            >
              Сохранить изменения
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={rankForm.handleSubmit(onSubmitRank)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
          <Grid item>
            <Select
              value={rank}
              {...rankForm.register("rank")}
              onChange={handleChangeRank}
              label="Ранг"
              style={{ minWidth: 182 }}
            >
              <MenuItem value={"user"}>Пользователь</MenuItem>
              <MenuItem value={"admin"}>Администратор</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button
              disabled={rank === editbleUserData?.rank ? true : false}
              type="submit"
              size="small"
              variant="text"
            >
              Сохранить изменения
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
          <Grid item>
            <TextField
              {...passwordForm.register("password", {
                required: "Введите новый пароль!",
              })}
              variant="standard"
              label="Новый пароль"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordForm.formState.errors.password?.message}
              error={Boolean(passwordForm.formState.errors.password?.message)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={password ? false : true}
              type="submit"
              size="small"
              variant="text"
              onClick={() => {
                const values = passwordForm.getValues();
                if (values.password.length < 5) {
                  passwordForm.setError("password", {
                    message: "Минимальная длина пароля 5 символов!",
                  });
                }
              }}
            >
              Сохранить изменения
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
