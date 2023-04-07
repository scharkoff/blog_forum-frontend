import React from 'react';
import { AdminPanelTable } from 'modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'redux/slices/users';
import { selectIsAuth } from 'redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const AdminPanel = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.data.userData),
    isAuth = useSelector(selectIsAuth);

  const [response, setResponse] = React.useState({});

  React.useEffect(() => {
    document.title = 'Панель администратора';
    (async () => {
      const response = await dispatch(fetchUsers());
      setResponse(response.payload);
    })();
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <AdminPanelTable user={user} response={response} />;
};
