import React from 'react';
import useAlertMessage from 'hooks/useAlertMessage';
import { Typography } from '@mui/material';
import {
  AlertMessage,
  UserEmailForm,
  UserLoginForm,
  UserPasswordForm,
  UserRankForm,
} from 'components';

export const EditUserDataForm = ({ editbleUserData, id }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [rank, setRank] = React.useState('');

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    if (editbleUserData) {
      setLogin(editbleUserData.login);
      setEmail(editbleUserData.email);
      setRank(editbleUserData.rank);
    }
  }, [editbleUserData]);

  return (
    <div>
      <AlertMessage {...alertVariables} />

      <Typography variant="h5" gutterBottom>
        Изменение данных пользователя
      </Typography>

      <UserLoginForm
        id={id}
        login={login}
        setLogin={setLogin}
        editbleUserData={editbleUserData}
        setAlertOptions={setAlertOptions}
      />

      <UserEmailForm
        id={id}
        email={email}
        setEmail={setEmail}
        editbleUserData={editbleUserData}
        setAlertOptions={setAlertOptions}
      />

      <UserRankForm
        id={id}
        rank={rank}
        setRank={setRank}
        editbleUserData={editbleUserData}
        setAlertOptions={setAlertOptions}
      />

      <UserPasswordForm
        id={id}
        password={password}
        setPassword={setPassword}
        editbleUserData={editbleUserData}
        setAlertOptions={setAlertOptions}
      />
    </div>
  );
};
