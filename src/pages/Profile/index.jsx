import React from 'react';
import { ProfileForm } from 'modules';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const user = useSelector((state) => state.auth.data.userData);

  React.useEffect(() => {
    if (user) {
      document.title = user.fullName;
    }
  }, [user]);

  return <ProfileForm user={user} />;
};
