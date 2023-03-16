import React from 'react';

import { Typography } from '@mui/material';

import { UsersTable } from 'components/UsersTable/index.jsx';
import { AlertMessage } from 'components/AlertMessage/index.jsx';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const AdminPanelTable = ({ user, response }) => {
  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    if (response.isError) {
      setAlertOptions(true, 'error', response.message);
    }
  }, [response]);

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
