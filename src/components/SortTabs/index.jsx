import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { resetSearchString, setActiveTab } from 'redux/slices/utils';
import {} from 'redux/slices/tags';

export const SortTabs = () => {
  const dispatch = useDispatch();

  const { activeTabs } = useSelector((state) => state.utils);

  function onSortPosts(type) {
    if (type === 'new') {
      dispatch(setActiveTab({ activeId: 0, activeType: 'new' }));
    }

    if (type === 'popular') {
      dispatch(setActiveTab({ activeId: 1, activeType: 'popular' }));
    }
  }

  return (
    <Tabs
      value={activeTabs.activeId}
      aria-label="Sort tabs"
      style={{ marginBottom: 15 }}
    >
      <Tab
        onClick={() => {
          onSortPosts('new');
          dispatch(resetSearchString(new Date().valueOf()));
        }}
        label="Новые"
      />
      <Tab
        onClick={() => {
          onSortPosts('popular');
          dispatch(resetSearchString(new Date().valueOf()));
        }}
        label="Популярные"
      />
    </Tabs>
  );
};
