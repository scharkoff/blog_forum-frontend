import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetSearchString,
  setActivePage,
  setActiveTab,
} from 'redux/slices/utils';

export const SortTabs = () => {
  const dispatch = useDispatch();

  const { activeTabs } = useSelector((state) => state.utils);

  function onSortPosts(type) {
    dispatch(setActivePage(0));

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
