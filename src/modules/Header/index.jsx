import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setActiveTag } from 'redux/slices/posts';
import { fetchLogout, selectIsAuth } from 'redux/slices/auth';
import { Avatar } from '@mui/material';
import {
  setActiveTab,
  resetSearchString,
  setActivePage,
} from 'redux/slices/utils';

export const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const isMobile = useSelector((state) => state.utils.isMobile.value);
  const { userData } = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти из акккаунта?')) {
      dispatch(fetchLogout());
      localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link
            onClick={() => {
              dispatch(setActiveTag(null));
              dispatch(
                setActiveTab({
                  activeId: 0,
                  activeType: 'new',
                }),
              );
              dispatch(resetSearchString(new Date().valueOf()));
              dispatch(setActivePage(0));
              dispatch(fetchPosts());
            }}
            className={styles.logo}
            to="/"
          >
            <div>SHARKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link
                  to={`/profile/${userData?._id}`}
                  style={{ marginLeft: 10 }}
                >
                  {userData ? (
                    <Avatar
                      src={`${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
                      variant="rounded"
                      sx={
                        !isMobile
                          ? { width: 36, height: 36 }
                          : { width: 32, height: 32 }
                      }
                    />
                  ) : (
                    ''
                  )}
                </Link>
                {userData.rank === 'admin' ? (
                  <Link to="/admin-panel" style={{ marginLeft: 10 }}>
                    <Button variant="contained" color="secondary">
                      <AdminPanelSettingsIcon
                        fontSize={!isMobile ? 'medium' : 'small'}
                      />
                    </Button>
                  </Link>
                ) : (
                  ''
                )}

                <Link to="/add-post" style={{ marginLeft: 10 }}>
                  <Button
                    variant="contained"
                    startIcon={!isMobile ? <AddIcon fontSize="small" /> : ''}
                  >
                    {!isMobile ? 'Создать' : <AddIcon fontSize="small" />}
                  </Button>
                </Link>
                <Link to="/login" style={{ marginLeft: 10 }}>
                  <Button
                    onClick={onClickLogout}
                    variant="contained"
                    color="error"
                  >
                    <LogoutIcon fontSize={!isMobile ? 'medium' : 'small'} />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ marginLeft: 10 }}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register" style={{ marginLeft: 10 }}>
                  <Button variant="contained">Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
