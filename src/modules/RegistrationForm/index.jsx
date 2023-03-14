import React from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchRegister, selectIsAuth } from 'redux/slices/auth';

import styles from './Registration.module.scss';
import { AlertMessage } from 'components/AlertMessage';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const { register, handleSubmit, setError, formState, getValues } = useForm({
    defaultValues: {
      rank: 'user',
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmitRegister = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload?.token);
    }

    if (data.payload?.isError) {
      setAlertOptions(
        true,
        'error',
        data.payload?.message ? data.payload?.message : data.payload[0]?.msg
      );
    } else {
      setAlertOptions(true, 'success', 'Вы успешно зарегистрировались!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AlertMessage {...alertVariables} />

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
            label="Полное имя"
            fullWidth
            {...register('fullName', { required: 'Введите имя' })}
            helperText={formState.errors.fullName?.message}
            error={Boolean(formState.errors.fullName?.message)}
          />
          <TextField
            className={styles.field}
            label="E-Mail"
            fullWidth
            {...register('email', { required: 'Укажите почту' })}
            helperText={formState.errors.email?.message}
            error={Boolean(formState.errors.email?.message)}
          />
          <TextField
            type="password"
            className={styles.field}
            label="Пароль"
            fullWidth
            {...register('password', { required: 'Введите пароль' })}
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
