import React from "react";

// -- Material UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

// -- Components
import { TagsBlock } from "../../components/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock";
import { Posts } from "../../components/Posts";

// -- React-redux
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// -- Redux state
import store from "../../redux/store";
import { fetchPosts, fetchSortedPosts } from "../../redux/slices/posts";
import { fetchTags, fetchSortedPostsLikeTag } from "../../redux/slices/tags";
import { fetchSortedComments } from "../../redux/slices/comments";
import { fetchAuthMe } from "../../redux/slices/auth";

// -- Styles
import styles from "./Home.module.scss";
import { resetSearchString } from "../../redux/slices/utils";

export const Home = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Redux state
  const state = store.getState();

  // -- Комментарии и посты в стейте
  const { comments } = state.posts;

  // -- Теги
  let { tags } = useSelector((state) => state.posts);

  // -- На главной ли странице
  const isHomePage = useSelector((state) => state.posts.posts.home);

  // -- Актуальный тег
  const { name } = useParams();

  // -- useState
  const [activeTab, setActiveTab] = React.useState(0);

  // -- useEffect
  React.useEffect(() => {
    document.title = "Главная страница";
    name
      ? dispatch(fetchSortedPostsLikeTag({ activeTab, name }))
      : dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchSortedComments());
    dispatch(fetchAuthMe());
  }, []);

  // -- Functions
  // -- Обработка клика по выбранному тегу
  const onSortPosts = (value) => {
    value === 1 ? setActiveTab(1) : setActiveTab(0);
    if (name) {
      dispatch(fetchSortedPostsLikeTag({ value, name }));
    } else dispatch(fetchSortedPosts(value));
  };

  return (
    <>
      <Tabs
        value={activeTab}
        aria-label="basic tabs example"
        style={{ marginBottom: 15 }}
      >
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

      <Grid container spacing={4} className={styles.contentWrapper}>
        <Grid xs={8} item className={styles.posts}>
          <Posts />
        </Grid>

        <Grid xs={4} item className={styles.tags}>
          <TagsBlock
            isHomePage={isHomePage}
            items={tags.items ? tags.items : []}
            isLoading={false}
          />
          <CommentsBlock
            className={styles.comments}
            items={comments.items ? comments.items : []}
            isLoading={false}
            isEditable={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
