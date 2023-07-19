import React from 'react';
import styles from './404.module.scss';
import { Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h2" color="initial">
        Error 404
      </Typography>
      <Typography variant="subtitle1" color="initial">
        Page not found
      </Typography>
    </div>
  );
};
