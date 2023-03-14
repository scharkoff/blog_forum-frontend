import React from 'react';

import { Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AlertMessage } from 'components/AlertMessage/index.jsx';
import { UserLoginForm } from 'components/EditUserDataForms/UserLoginForm/index.jsx';
import { UserEmailForm } from 'components/EditUserDataForms/UserEmailForm/index.jsx';
import { UserRankForm } from 'components/EditUserDataForms/UserRankForm/index.jsx';
import { UserPasswordForm } from 'components/EditUserDataForms/UserPasswordForm/index.jsx';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const EditUserDataForm = () => {
  const editbleUserData = useSelector((state) => state.users?.editbleUserData);

  const { id } = useParams();

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
