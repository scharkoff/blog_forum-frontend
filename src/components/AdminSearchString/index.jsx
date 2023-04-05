import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdminSearchString.module.scss';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';

export const AdminSearchString = ({ setRows, copyOfRows }) => {
  const [activeSearchIcon, setActiveSearchIcon] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const getUsersLikeSearchText = (e) => {
    const words = e.target.value;
    setSearchText(words);
    setRows(
      copyOfRows.filter(
        (row) =>
          row.fullName.toLowerCase().includes(words.toLowerCase()) ||
          row.email.toLowerCase().includes(words.toLowerCase()) ||
          row.rank.toLowerCase().includes(words.toLowerCase()),
      ),
    );
  };
  return (
    <>
      <TextField
        className={styles.search}
        onSelect={() => setActiveSearchIcon(true)}
        onBlur={() => setActiveSearchIcon(false)}
        variant="standard"
        classes={{ root: styles.search }}
        id="search"
        label="Поиск пользователя..."
        value={searchText}
        onChange={(e) => getUsersLikeSearchText(e)}
      />
      <Search
        style={{ marginTop: 20 }}
        color={!activeSearchIcon ? 'disabled' : 'primary'}
      />
    </>
  );
};

AdminSearchString.propTypes = {
  setPostsArray: PropTypes.func,
  copyOfPosts: PropTypes.array,
};
