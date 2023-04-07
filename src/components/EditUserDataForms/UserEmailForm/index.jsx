import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUpdateByCondition } from 'redux/slices/users';
import { handlingInternalOrServerError } from 'utils/functions/errors/handlingInternalOrServerError';

export const UserEmailForm = React.memo(
  ({ id, email, setEmail, editbleUserData, setAlertOptions }) => {
    const dispatch = useDispatch();

    const emailForm = useForm({
      defaultValues: {
        id,
        email: '',
      },
      mode: 'onChange',
    });

    const onSubmitEmail = async (values) => {
      const response = await dispatch(fetchUpdateByCondition(values));
      handlingInternalOrServerError(response, setAlertOptions);
    };

    return (
      <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
          <Grid item>
            <TextField
              {...emailForm.register('email', {
                required: 'Введите новую почту!',
              })}
              variant="standard"
              placeholder="Введите новую почту..."
              label="Почта"
              fullWidth
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailForm.formState.errors.email?.message}
              error={Boolean(emailForm.formState.errors.email?.message)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={
                email === editbleUserData?.email || !email?.length
                  ? true
                  : false
              }
              type="submit"
              size="small"
              variant="text"
            >
              Сохранить изменения
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  },
);
