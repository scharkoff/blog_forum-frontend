import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import handlingInternalOrServerError from 'utils/functions/errors/handlingInternalOrServerError';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUpdateByCondition } from 'redux/slices/users';

export const UserPasswordForm = React.memo(
  ({ id, password, setPassword, setAlertOptions }) => {
    const dispatch = useDispatch();

    const passwordForm = useForm({
      defaultValues: {
        id,
        password: '',
      },
      mode: 'onChange',
    });

    const onSubmitPassword = async (values) => {
      const response = await dispatch(fetchUpdateByCondition(values));
      handlingInternalOrServerError(response, setAlertOptions);
    };

    return (
      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
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
  },
);
