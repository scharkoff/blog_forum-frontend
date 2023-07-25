import React from 'react';
import styles from './Profile.module.scss';
import { ProfileForm } from 'modules';
import { useSelector } from 'react-redux';
import useAlertMessage from 'hooks/useAlertMessage';
import { AlertMessage } from 'components';

export const Profile = () => {
  const [alertVariables, setAlertOptions] = useAlertMessage();

  const user = useSelector((state) => state.auth.data.userData);

  React.useEffect(() => {
    if (user) {
      document.title = user.fullName;
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.alert}>
        <AlertMessage {...alertVariables} />
      </div>

      <ProfileForm user={user} setAlertOptions={setAlertOptions} />
    </div>
  );
};
