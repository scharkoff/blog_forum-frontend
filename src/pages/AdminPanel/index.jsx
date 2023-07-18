import React from 'react';
import styles from './AdminPanel.module.scss';
import { AdminPanelTable } from 'modules';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from 'redux/slices/auth';

export const AdminPanel = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.auth.data.userData);

  React.useEffect(() => {
    document.title = 'Панель администратора';
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <AdminPanelTable user={user} />
    </div>
  );
};
