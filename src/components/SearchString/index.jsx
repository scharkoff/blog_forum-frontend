import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchString.module.scss';

import store from 'redux/store';

import TextField from '@mui/material/TextField';

export const SearchString = ({ setPostsArray, copyOfPosts }) => {
  const state = store.getState();

  const isResetSearchStringValue = state.utils?.search?.resetSearchString;
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    if (isResetSearchStringValue) {
      setSearchText('');
    }
  }, [isResetSearchStringValue]);

  const getPostsLikeSearchText = (e) => {
    const words = e.target.value;
    setSearchText(words);
    setPostsArray(
      copyOfPosts.filter((post) =>
        post.title.toLowerCase().includes(words.toLowerCase())
      )
    );
  };

  return (
    <>
      <TextField
        style={{ marginBottom: 15 }}
        variant="filled"
        classes={{ root: styles.search }}
        id="search"
        label="Поиск статьи..."
        value={searchText}
        onChange={(e) => getPostsLikeSearchText(e)}
      />
    </>
  );
};

SearchString.propTypes = {
  setPostsArray: PropTypes.func.isRequired,
  copyOfPosts: PropTypes.array.isRequired,
};
