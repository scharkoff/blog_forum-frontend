import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { resetSearchString, setActiveTab } from 'redux/slices/utils';
import { fetchSortedPostsLikeTag } from 'redux/slices/tags';
import { fetchPosts, fetchSortedPosts } from 'redux/slices/posts';
import { useParams } from 'react-router-dom';

export const SortTabs = () => {
  const dispatch = useDispatch();

  const tagName = useParams();

  const { activeId } = useSelector((state) => state.utils?.activeTabs);

  const onSortPosts = (value) => {
    if (value === 1) {
      dispatch(setActiveTab(1));
    } else {
      dispatch(setActiveTab(0));
    }

    if (Object.entries(tagName).length) {
      dispatch(fetchSortedPostsLikeTag({ value, tagName }));
    } else {
      dispatch(fetchSortedPosts(value));
    }
  };

  React.useEffect(() => {
    if (Object.entries(tagName).length) {
      dispatch(fetchSortedPostsLikeTag({ activeId, tagName }));
    } else {
      dispatch(fetchPosts());
    }
  }, []);

  React.useEffect(() => {
    setActiveTab(activeId);
  }, [activeId]);

  return (
    <Tabs value={activeId} aria-label="Sort tabs" style={{ marginBottom: 15 }}>
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
