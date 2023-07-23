import React from 'react';
import styles from './ActivatePage.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';

export const ActivatePage = () => {
  const { link } = useParams();

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <CheckCircleIcon className={styles.icon} />
      </div>

      <div className={styles.title}>
        Аккаунт <strong>{link}</strong> <span>успешно активирован</span>
      </div>
    </div>
  );
};
