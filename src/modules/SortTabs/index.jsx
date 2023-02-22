import React from "react";
import { useDispatch } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { resetSearchString } from "../../redux/slices/utils";
import { fetchSortedPostsLikeTag } from "../../redux/slices/tags";
import { fetchPosts, fetchSortedPosts } from "../../redux/slices/posts";
import { useParams } from "react-router-dom";

export const SortTabs = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();

  const name = useParams();

  const onSortPosts = (value) => {
    value === 1 ? setActiveTab(1) : setActiveTab(0);
    if (Object.entries(name).length) {
      console.log("active name", name);
      dispatch(fetchSortedPostsLikeTag({ value, name }));
    } else {
      dispatch(fetchSortedPosts(value));
    }
  };

  React.useEffect(() => {
    if (Object.entries(name).length) {
      dispatch(fetchSortedPostsLikeTag({ activeTab, name }));
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
