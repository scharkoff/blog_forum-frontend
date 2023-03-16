import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUpdateUserRank } from 'redux/slices/auth';
import { handlingInternalOrServerError } from 'utils/functions/errors/handlingInternalOrServerError';

export const UserRankForm = React.memo(
  ({ id, rank, setRank, editbleUserData, setAlertOptions }) => {
    const dispatch = useDispatch();

    const handleChangeRank = (event) => {
      setRank(event.target.value);
    };

    const rankForm = useForm({
      defaultValues: {
        id,
        rank: '',
      },
      mode: 'onChange',
    });

    const onSubmitRank = async (values) => {
      const response = await dispatch(fetchUpdateUserRank(values));
      handlingInternalOrServerError(response, setAlertOptions);
    };

    return (
      <form onSubmit={rankForm.handleSubmit(onSubmitRank)}>
        <Grid container spacing={1} marginTop={2} alignItems="center">
          <Grid item>
            <Select
              value={rank || 'user'}
              {...rankForm.register('rank')}
              onChange={handleChangeRank}
              label="Ранг"
              style={{ minWidth: 182 }}
              placeholder="Выберите ранг"
            >
              <MenuItem value={'user'}>Пользователь</MenuItem>
              <MenuItem value={'admin'}>Администратор</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button
              disabled={rank === editbleUserData?.rank ? true : false}
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
  }
);
