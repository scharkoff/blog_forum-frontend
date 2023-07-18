import React from 'react';
import styles from './AddPost.module.scss';
import { AddPostForm } from 'modules';
import { selectIsAuth } from 'redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);

  const { id } = useParams();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <AddPostForm id={id} />
    </div>
  );
};
