import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUpdateUserPassword } from 'redux/slices/auth';

export const ProfilePasswordForm = React.memo(
  ({ password, setPassword, setAlertText, setAlertType, setOpen }) => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const onSubmitPassword = async (values) => {
      const data = await dispatch(fetchUpdateUserPassword(values));

      if (data.payload.isError) {
        setAlertText(data.payload[0].msg);
        setOpen(true);
        setAlertType('error');
      } else {
        setAlertText('Пароль успешно изменен');
        setOpen(true);
        setAlertType('success');
      }
    };

    const passwordForm = useForm({
      defaultValues: {
        id,
        password: '',
      },
      mode: 'onChange',
    });
    return (
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
              {...passwordForm.register('password', {
                required: 'Введите новый пароль!',
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
                  passwordForm.setError('password', {
                    message: 'Минимальная длина пароля 5 символов!',
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

PropTypes.ProfilePasswordForm = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setAlertText: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
