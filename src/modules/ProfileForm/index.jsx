import React from 'react';

import { AlertMessage } from 'components/AlertMessage/index.jsx';
import { ProfileAvatarForm } from 'components/ProfileForms/ProfileAvatarForm/index.jsx';
import { ProfileLoginForm } from 'components/ProfileForms/ProfileLoginForm/index.jsx';
import { ProfileEmailForm } from 'components/ProfileForms/ProfileEmailForm/index.jsx';
import { ProfilePasswordForm } from 'components/ProfileForms/ProfilePasswordForm/index.jsx';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const ProfileForm = ({ user }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    if (user) {
      setLogin(user.fullName);
      setEmail(user.email);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  return (
    <div>
      <AlertMessage {...alertVariables} />

      <ProfileAvatarForm
        avatarUrl={avatarUrl}
        setAlertOptions={setAlertOptions}
      />

      <ProfileLoginForm
        user={user}
        login={login}
        setLogin={setLogin}
        setAlertOptions={setAlertOptions}
      />

      <ProfileEmailForm
        user={user}
        email={email}
        setEmail={setEmail}
        setAlertOptions={setAlertOptions}
      />

      <ProfilePasswordForm
        password={password}
        setPassword={setPassword}
        setAlertOptions={setAlertOptions}
      />
    </div>
  );
};
