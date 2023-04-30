import React from 'react';
import useAlertMessage from 'hooks/useAlertMessage';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchUsers } from 'redux/slices/users';
import { AlertMessage, UsersTable } from 'components';

export const AdminPanelTable = ({ user }) => {
  const dispatch = useDispatch();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    (async () => {
      const response = await dispatch(fetchUsers());

      if (response.payload?.isError) {
        setAlertOptions(true, 'error', response.payload?.message);
      }
    })();
  }, []);

  return (
    <div>
      <AlertMessage {...alertVariables} />

      <Typography variant="h5" gutterBottom style={{ margin: 0 }}>
        Таблица всех пользователей
      </Typography>

      <UsersTable setAlertOptions={setAlertOptions} user={user} />
    </div>
  );
};
