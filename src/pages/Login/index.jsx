import React from 'react';
import styles from './Login.module.scss';
import { LoginForm } from 'modules';
import useAlertMessage from 'hooks/useAlertMessage';
import { AlertMessage } from 'components';

export const Login = () => {
  const [alertVariables, setAlertOptions] = useAlertMessage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.alert}>
        <AlertMessage {...alertVariables} />
      </div>

      <LoginForm setAlertOptions={setAlertOptions} />
    </div>
  );
};
