import React from 'react';
import styles from './Login.module.scss';
import { LoginForm } from 'modules';

export const Login = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};
