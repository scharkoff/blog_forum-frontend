import React from 'react';
import styles from './Registration.module.scss';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import useAlertMessage from 'hooks/useAlertMessage';
import handlingInternalOrServerError from 'utils/functions/errors/handlingInternalOrServerError';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from 'redux/slices/auth';
import { AlertMessage } from 'components';
import { setLoader } from 'redux/slices/utils';

export const RegistrationForm = ({ setAlertOptions }) => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const { isLoading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmitRegister = async (values) => {
    dispatch(setLoader(true));

    const response = await dispatch(fetchRegister(values));

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
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <TextField
            className={styles.field}
            label="Логин"
            fullWidth
            {...register('fullName', {
              required: 'Введите логин',
              minLength: {
                value: 3,
                message: 'Логин должен содержать минимум 3 символа',
              },
            })}
            helperText={formState.errors.fullName?.message}
            error={Boolean(formState.errors.fullName?.message)}
          />
          <TextField
            className={styles.field}
            label="Email"
            fullWidth
            {...register('email', {
              required: 'Укажите почту',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Неверный формат почты',
              },
            })}
            helperText={formState.errors.email?.message}
            error={Boolean(formState.errors.email?.message)}
          />
          <TextField
            type="password"
            className={styles.field}
            label="Пароль"
            fullWidth
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 5,
                message: 'Пароль должен содержать минимум 5 символов',
              },
            })}
            helperText={formState.errors.password?.message}
            error={Boolean(formState.errors.password?.message)}
          />
          <Button
            disabled={!formState.isValid || isLoading}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Зарегистрироваться
          </Button>

          <p className={styles.auth}>
            Есть аккаунт? <Link to="/login">Авторизоваться</Link>
          </p>
        </form>
      </Paper>
    </div>
  );
};
