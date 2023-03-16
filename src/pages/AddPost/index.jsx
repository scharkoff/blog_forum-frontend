import React from 'react';
import { AddPostForm } from 'modules';
import { selectIsAuth } from 'redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);

  const { id } = useParams();

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return <AddPostForm id={id} />;
};
