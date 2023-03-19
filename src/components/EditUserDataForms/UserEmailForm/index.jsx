import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUpdateUserEmail } from 'redux/slices/users';
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
      const response = await dispatch(fetchUpdateUserEmail(values));
      handlingInternalOrServerError(response, setAlertOptions);
    };

    function validateEmail(emailField) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (reg.test(emailField.value) === false) {
        return false;
      }

      return true;
    }

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
              onClick={() => {
                const values = emailForm.getValues();
                if (validateEmail(values.email)) {
                  emailForm.setError('email', {
                    message: 'Неверный формат почты!',
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
