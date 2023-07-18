import React from 'react';
import styles from './Registration.module.scss';
import useAlertMessage from 'hooks/useAlertMessage';
import { RegistrationForm } from 'modules';
import { AlertMessage } from 'components';

export const Registation = () => {
  const [alertVariables, setAlertOptions] = useAlertMessage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.alert}>
        <AlertMessage {...alertVariables} />
      </div>

      <RegistrationForm setAlertOptions={setAlertOptions} />
    </div>
  );
};
