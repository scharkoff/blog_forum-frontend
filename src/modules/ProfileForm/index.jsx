import React from 'react';

import { useSelector } from 'react-redux';

import { AlertMessage } from 'components/AlertMessage/index.jsx';
import { ProfileAvatarForm } from 'components/ProfileForms/ProfileAvatarForm/index.jsx';
import { ProfileLoginForm } from 'components/ProfileForms/ProfileLoginForm/index.jsx';
import { ProfileEmailForm } from 'components/ProfileForms/ProfileEmailForm/index.jsx';
import { ProfilePasswordForm } from 'components/ProfileForms/ProfilePasswordForm/index.jsx';

export const ProfileForm = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  const user = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    if (user) {
      setLogin(user.fullName);
      setEmail(user.email);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <ProfileAvatarForm
        avatarUrl={avatarUrl}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <ProfileLoginForm
        user={user}
        login={login}
        setLogin={setLogin}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <ProfileEmailForm
        user={user}
        email={email}
        setEmail={setEmail}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <ProfilePasswordForm
        password={password}
        setPassword={setPassword}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />
    </div>
  );
};
