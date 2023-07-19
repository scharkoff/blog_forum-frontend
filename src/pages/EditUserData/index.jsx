import React from 'react';
import styles from './EditUserData.module.scss';
import { EditUserDataForm } from 'modules';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchUserById, fetchUsers } from 'redux/slices/users';
import { selectIsAuth } from 'redux/slices/auth';

export const EditUserData = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const { id } = useParams();

  const userData = useSelector((state) => state.users.user);

  const [editbleUserData, setEditbleUserData] = React.useState({});

  React.useEffect(() => {
    dispatch(fetchUserById({ id }));
  }, []);

  React.useEffect(() => {
    if (userData) {
      setEditbleUserData({
        id: userData.data._id,
        login: userData.data.fullName,
        email: userData.data.email,
        rank: userData.data.rank,
      });
    }
  }, [userData]);

  return (
    <div className={styles.wrapper}>
      <EditUserDataForm editbleUserData={editbleUserData} id={id} />
    </div>
  );
};
