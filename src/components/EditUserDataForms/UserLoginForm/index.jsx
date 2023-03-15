import React from "react";

// -- Material UI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// -- React-redux
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUpdateUserLogin } from "../../../redux/slices/auth";

export const UserLoginForm = React.memo(
  ({
    id,
    login,
    setLogin,
    editbleUserData,
    setAlertText,
    setAlertType,
    setOpen,
  }) => {
    const dispatch = useDispatch();

    const fullNameForm = useForm({
      defaultValues: {
        id,
        fullName: "",
      },
      mode: "onChange",
    });

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
    return (
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
    );
  }
);