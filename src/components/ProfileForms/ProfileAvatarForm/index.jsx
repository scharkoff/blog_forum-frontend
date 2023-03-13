import React from 'react';
import PropTypes from 'prop-types';

import axios from 'configs/axios/axios';

import { Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUpdateUserAvatar } from 'redux/slices/auth.js';

export const ProfileAvatarForm = React.memo(
  ({ avatarUrl, setAlertOptions }) => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const [newAvatarUrl, setNewAvatarUrl] = React.useState('');

    const inputFileRef = React.useRef(null);
    const submitButton = React.useRef(null);

    const handleChangeFile = async (event) => {
      try {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData);
        setNewAvatarUrl(data.url);
      } catch (error) {
        setAlertOptions(true, 'error', 'Не удалось загрузить изображение!');
      }
    };

    const onSubmitAvatar = async (values) => {
      const data = await dispatch(fetchUpdateUserAvatar(values));

      if (data.payload.isError) {
        setAlertOptions(true, 'error', data?.payload[0]?.msg);
      } else {
        setAlertOptions(true, 'success', 'Аватар успешно изменен');
      }
    };

    const avatarForm = useForm({
      defaultValues: {
        id,
        avatarUrl: '',
      },
      mode: 'onChange',
    });

    return (
      <form onSubmit={avatarForm.handleSubmit(onSubmitAvatar)}>
        <Grid container justifyContent="center">
          <Grid item>
            <Avatar
              alt="avatar"
              sx={{ width: 200, height: 200 }}
              src={
                newAvatarUrl
                  ? `${
                      process.env.REACT_APP_API_URL || 'http://localhost:4444'
                    }${newAvatarUrl}`
                  : `${
                      process.env.REACT_APP_API_URL || 'http://localhost:4444'
                    }${avatarUrl}`
              }
            ></Avatar>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center" marginTop={2}>
          <Grid item>
            <Button
              onClick={() => {
                inputFileRef.current.click();
                submitButton.current.click();
              }}
              variant="outlined"
              size="large"
            >
              Изменить аватар
            </Button>
            <input
              ref={inputFileRef}
              type="file"
              name="image"
              onChange={handleChangeFile}
              hidden
            />
            <TextField
              value={newAvatarUrl}
              variant="standard"
              sx={{ width: 0, height: 0 }}
              {...avatarForm.register('avatarUrl', { required: true })}
            />
          </Grid>

          <Grid item>
            <Button
              ref={submitButton}
              type="submit"
              size="large"
              variant="contained"
            >
              Загрузить
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
);

PropTypes.ProfileAvatarForm = {
  avatarUrl: PropTypes.string.isRequired,
  setAlertText: PropTypes.func.isRequired,
  setAlertType: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
