import React from 'react';
import styles from './Registration.module.scss';
import { RegistrationForm } from 'modules';

export const Registation = () => {
  return (
    <div className={styles.wrapper}>
      <RegistrationForm />
    </div>
  );
};
