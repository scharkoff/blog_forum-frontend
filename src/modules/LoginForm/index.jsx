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
import { Link, Navigate } from 'react-router-dom';
import { fetchLogin, selectIsAuth } from 'redux/slices/auth';
import { AlertMessage } from 'components';
import { setLoader } from 'redux/slices/utils';

export const LoginForm = ({ setAlertOptions }) => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const { isLoading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onLogin = async (values) => {
    dispatch(setLoader(true));

    const response = await dispatch(fetchLogin(values));

    dispatch(setLoader(false));

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
      <Paper elevation={0} classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit(onLogin)}>
          <TextField
            className={styles.field}
            label="Email"
            error={Boolean(formState.errors.email?.message)}
            helperText={formState.errors.email?.message}
            {...register('email', {
              required: 'Укажите почту',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Неверный формат почты',
              },
            })}
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
              minLength: {
                value: 5,
                message: 'Пароль должен содержать минимум 5 символов',
              },
            })}
            helperText={formState.errors.password?.message}
          />
          <Button
            disabled={!formState.isValid || isLoading}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Войти
          </Button>

          <p className={styles.reg}>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </form>
      </Paper>
    </div>
  );
};
