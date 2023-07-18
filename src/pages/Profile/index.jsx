import React from 'react';
import styles from './Profile.module.scss';
import { ProfileForm } from 'modules';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const user = useSelector((state) => state.auth.data.userData);

  React.useEffect(() => {
    if (user) {
      document.title = user.fullName;
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <ProfileForm user={user} />
    </div>
  );
};
