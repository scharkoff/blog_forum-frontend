import React from 'react';

import { Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from 'redux/slices/users.js';

import { UsersTable } from 'components/UsersTable/index.jsx';
import { AlertMessage } from 'components/AlertMessage/index.jsx';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const AdminPanelTable = () => {
  const dispatch = useDispatch();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const user = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchUsers());
    document.title = 'Админ панель';
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
