import React from 'react';
import { useDispatch } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { resetSearchString } from 'redux/slices/utils';
import { fetchSortedPostsLikeTag } from 'redux/slices/tags';
import { fetchPosts, fetchSortedPosts } from 'redux/slices/posts';
import { useParams } from 'react-router-dom';

export const SortTabs = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();

  const tagName = useParams();

  const onSortPosts = (value) => {
    value === 1 ? setActiveTab(1) : setActiveTab(0);
    if (Object.entries(tagName).length) {
      console.log('active tagName', tagName);
      dispatch(fetchSortedPostsLikeTag({ value, tagName }));
    } else {
      dispatch(fetchSortedPosts(value));
    }
  };

  React.useEffect(() => {
    if (Object.entries(tagName).length) {
      dispatch(fetchSortedPostsLikeTag({ activeTab, tagName }));
    } else {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Tabs value={activeTab} aria-label="Sort tabs" style={{ marginBottom: 15 }}>
      <Tab
        onClick={() => {
          onSortPosts(0);
          dispatch(resetSearchString(new Date().valueOf()));
        }}
        label="Новые"
      />
      <Tab
        onClick={() => {
          onSortPosts(1);
          dispatch(resetSearchString(new Date().valueOf()));
        }}
        label="Популярные"
      />
    </Tabs>
  );
};
