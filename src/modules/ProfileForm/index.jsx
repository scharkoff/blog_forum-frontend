import React from 'react';
import {
  ProfileAvatarForm,
  ProfileEmailForm,
  ProfileLoginForm,
  ProfilePasswordForm,
} from 'components';

export const ProfileForm = ({ user, setAlertOptions }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');

  React.useEffect(() => {
    if (user) {
      setLogin(user.fullName);
      setEmail(user.email);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  return (
    <div>
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
