import React from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchUpdateUserEmail } from "../../../redux/slices/auth";

export const ProfileEmailForm = React.memo(
  ({ user, email, setEmail, setAlertText, setAlertType, setOpen }) => {
    const dispatch = useDispatch();

    const { id } = useParams();

    function validateEmail(emailField) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (reg.test(emailField.value) === false) {
        return false;
      }

      return true;
    }

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

    const emailForm = useForm({
      defaultValues: {
        id,
        email: "",
      },
      mode: "onChange",
    });

    return (
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
    );
  }
);

PropTypes.ProfileEmailForm = {
  user: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setAlertText: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};