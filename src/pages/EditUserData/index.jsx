import React from 'react';
import styles from './EditUserData.module.scss';
import { EditUserDataForm } from 'modules';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchUsers } from 'redux/slices/users';
import { selectIsAuth } from 'redux/slices/auth';

export const EditUserData = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const { id } = useParams();

  const users = useSelector((state) => state.users.data);

  const [editbleUserData, setEditbleUserData] = React.useState({});

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  React.useEffect(() => {
    if (users.length) {
      const user = users.filter((user) => user._id === id)[0];
      setEditbleUserData({
        id: user._id,
        login: user.fullName,
        email: user.email,
        rank: user.rank,
      });
    }
  }, [users]);

  return (
    <div className={styles.wrapper}>
      <EditUserDataForm editbleUserData={editbleUserData} id={id} />
    </div>
  );
};
