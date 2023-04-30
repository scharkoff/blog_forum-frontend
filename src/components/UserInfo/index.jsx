import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, additionalText, rank }) => {
  return (
    <div className={styles.root}>
      <Avatar
        sx={{ width: 35, height: 35, marginRight: 1 }}
        alt={fullName}
        src={
          avatarUrl
            ? `${process.env.REACT_APP_API_URL}${avatarUrl}`
            : './images/noavatar.png'
        }
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>
          {fullName}{' '}
          <span className={rank === 'user' ? styles.rank : styles.admin}>
            {rank}
          </span>
        </span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  additionalText: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};
