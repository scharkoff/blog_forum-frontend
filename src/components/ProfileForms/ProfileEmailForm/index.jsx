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
import { setLoader } from 'redux/slices/utils';

export const ProfileEmailForm = React.memo(
  ({ user, email, setEmail, setAlertOptions }) => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const onSubmitEmail = async (values) => {
      dispatch(setLoader(true));
      const response = await dispatch(fetchUpdateByCondition(values));
      dispatch(setLoader(false));

      handlingInternalOrServerError(response, setAlertOptions);
    };

    const emailForm = useForm({
      defaultValues: {
        id,
        email: '',
      },
      mode: 'onChange',
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
              {...emailForm.register('email', {
                required: 'Введите новую почту!',
              })}
              variant="standard"
              placeholder="Введите новую почту..."
              label="Почта"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={email === user?.email ? true : false}
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

PropTypes.ProfileEmailForm = {
  user: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setAlertText: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
