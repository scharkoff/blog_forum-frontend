import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import handlingInternalOrServerError from 'utils/functions/errors/handlingInternalOrServerError';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUpdateByCondition } from 'redux/slices/users';

export const ProfileLoginForm = React.memo(
  ({ user, login, setLogin, setAlertOptions }) => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const onSubmitLogin = async (values) => {
      const response = await dispatch(fetchUpdateByCondition(values));
      handlingInternalOrServerError(response, setAlertOptions);
    };

    const fullNameForm = useForm({
      defaultValues: {
        id,
        fullName: '',
      },
      mode: 'onChange',
    });

    return (
      <form onSubmit={fullNameForm.handleSubmit(onSubmitLogin)}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Grid item>
            <TextField
              {...fullNameForm.register('fullName', {
                required: 'Введите новый логин!',
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
              disabled={login === user?.fullName ? true : false}
              type="submit"
              size="small"
              variant="text"
              onClick={() => {
                const values = fullNameForm.getValues();
                if (values.fullName.length < 3) {
                  fullNameForm.setError('fullName', {
                    message: 'Минимальная длина имени 3 символа!',
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

PropTypes.ProfileLoginForm = {
  user: PropTypes.object.isRequired,
  login: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired,
  setAlertText: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
