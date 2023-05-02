import React from 'react';
import styles from './scss/Login.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useAlertMessage from 'hooks/useAlertMessage';
import handlingInternalOrServerError from 'utils/functions/errors/handlingInternalOrServerError';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from 'redux/slices/auth';
import { AlertMessage } from 'components';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmitAuth = async (values) => {
    const response = await dispatch(fetchAuth(values));

    if (response.payload) {
      localStorage.setItem('token', response.payload.token);
    }

    handlingInternalOrServerError(response, setAlertOptions);
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AlertMessage {...alertVariables} />

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
            {...register('email', { required: 'Укажите почту' })}
            fullWidth
          />
          <TextField
            type="password"
            className={styles.field}
            label="Пароль"
            error={Boolean(formState.errors.password?.message)}
            fullWidth
            {...register('password', {
              required: 'Введите пароль',
            })}
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
