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
import Paper from "@mui/material/Paper";

// -- React-redux
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// -- Redux state
import {
  fetchUpdateUserAvatar,
  fetchUpdateUserEmail,
  fetchUpdateUserLogin,
  fetchUpdateUserPassword,
} from "../../redux/slices/auth.js";

export const Profile = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- User id
  const { id } = useParams();

  // -- Form settings hooks
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [newAvatarUrl, setNewAvatarUrl] = React.useState("");
  const [disableSaveButton, setDisableSaveButton] = React.useState(true);
  const [disableLoadButton, setDisableLoadButton] = React.useState(true);

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- useRef file input
  const inputFileRef = React.useRef(null);

  // -- Current user data
  const user = useSelector((state) => state.auth.data);

  // -- useEffect
  React.useEffect(() => {
    if (user) {
      setLogin(user.fullName);
      setEmail(user.email);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  React.useEffect(() => {
    console.log("new avatar url: " + newAvatarUrl);
  }, [newAvatarUrl]);

  React.useEffect(() => {
    axios.get("/auth/me").then((res) => {
      return res.data;
    });
  }, []);

  // -- Валидация почты для отображения ошибки в поле
  function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField.value) === false) {
      return false;
    }

    return true;
  }

  // -- Загрузка новой аватарки
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setNewAvatarUrl(data.url);
      setDisableSaveButton(false);
    } catch (error) {
      console.error(error);
      alert("Не удалось загрузить изображение!");
    }
  };

  // -- Обработка клика по кнопке "Сохранить изменения" на новый логин
  const onSubmitLogin = async (values) => {
    const data = await dispatch(fetchUpdateUserLogin(values));

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Логин успешно изменен");
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
      setAlertText("Пароль успешно изменен");
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
      setAlertText("Почта успешно изменена");
      setOpen(true);
      setAlertType("success");
    }
  };

  // -- Обработка клика по кнопке "Сохранить изменения" на новый аватар
  const onSubmitAvatar = async (values) => {
    const data = await dispatch(fetchUpdateUserAvatar(values));
    console.log(values);

    if (data.payload.isError) {
      setAlertText(data.payload[0].msg);
      setOpen(true);
      setAlertType("error");
    } else {
      setAlertText("Аватар успешно изменен");
      setOpen(true);
      setAlertType("success");
    }
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

      <form onSubmit={avatarForm.handleSubmit(onSubmitAvatar)}>
        <Grid container justifyContent="center">
          <Grid item>
            <Avatar
              alt="avatar"
              sx={{ width: 200, height: 200 }}
              src={
                newAvatarUrl
                  ? `http://localhost:4444${newAvatarUrl}`
                  : `http://localhost:4444${avatarUrl}`
              }
            ></Avatar>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center" marginTop={2}>
          <Grid item>
            <Button
              onClick={() => inputFileRef.current.click()}
              variant="outlined"
              size="large"
            >
              Изменить аватар
            </Button>
            <input
              autoFocus={true}
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            <TextField
              value={newAvatarUrl}
              variant="standard"
              style={{ width: 0, height: 0 }}
              {...avatarForm.register("avatarUrl", { required: true })}
            />
          </Grid>

          <Grid item>
            <Button
              disabled={disableSaveButton}
              onClick={() => {
                setDisableLoadButton(false);
                setDisableSaveButton(true);
              }}
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
            >
              Сохранить
            </Button>
          </Grid>

          <Grid item>
            <Button
              disabled={disableLoadButton}
              type="submit"
              size="large"
              variant="contained"
            >
              Загрузить
            </Button>
          </Grid>
        </Grid>
      </form>

      <form onSubmit={fullNameForm.handleSubmit(onSubmitLogin)}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
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
              disabled={login === user?.fullName ? true : false}
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
        <Grid
          container
          spacing={1}
          justifyContent="center"
          marginTop={2}
          alignItems="center"
        >
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
              disabled={email === user?.email ? true : false}
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

      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          marginTop={2}
          alignItems="center"
        >
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
