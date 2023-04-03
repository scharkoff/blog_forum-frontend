import React from 'react';
import styles from './SearchString.module.scss';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'redux/slices/posts';
import { setActivePage } from 'redux/slices/utils';
import { useParams } from 'react-router-dom';

export const SearchString = () => {
  const dispatch = useDispatch();

  const tag = useParams();

  const { resetSearchString } = useSelector((state) => state.utils.search);
  const { activeTabs } = useSelector((state) => state.utils);

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setSearchText('');
  }, [resetSearchString]);

  const getPostsLikeSearchText = (e) => {
    e.preventDefault();
    dispatch(setActivePage(0));
    dispatch(fetchPosts({ activeTabs, searchText, tagName: tag.name }));
  };

  return (
    <form onSubmit={(e) => getPostsLikeSearchText(e)}>
      <TextField
        style={{ marginBottom: 15 }}
        variant="filled"
        classes={{ root: styles.search }}
        id="search"
        label="Поиск статьи..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSubmit={(e) => getPostsLikeSearchText(e)}
      />
    </form>
  );
};
