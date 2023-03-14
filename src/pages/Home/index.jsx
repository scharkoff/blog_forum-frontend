import React from 'react';

import Grid from '@mui/material/Grid';

import { SortTabs } from 'components';

import { TagsBlock } from 'components/TagsBlock';
import { CommentsBlock } from 'components/CommentsBlock';
import { Posts } from 'modules/Posts';

import { useDispatch, useSelector } from 'react-redux';

import store from 'redux/store';
import { fetchTags } from 'redux/slices/tags';
import { fetchSortedComments } from 'redux/slices/comments';
import { fetchAuthMe } from 'redux/slices/auth';

import styles from './Home.module.scss';

export const Home = () => {
  const dispatch = useDispatch();

  const state = store.getState();

  const { comments } = state.posts;

  let { tags } = useSelector((state) => state.posts);

  const isHomePage = useSelector((state) => state.posts?.posts?.home);

  const { status } = useSelector((state) => state.posts?.comments);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === 'loaded') {
      setIsLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    document.title = 'Главная страница';
    dispatch(fetchTags());
    dispatch(fetchSortedComments());
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <SortTabs />

      <Grid container spacing={4} className={styles.contentWrapper}>
        <Grid xs={8} item className={styles.posts}>
          <Posts />
        </Grid>

        <Grid xs={4} item className={styles.tags}>
          <TagsBlock
            isHomePage={isHomePage}
            tags={tags.items ? tags.items : []}
            isLoading={isLoading}
          />
          <CommentsBlock
            className={styles.comments}
            items={comments.items ? comments.items : []}
            isLoading={isLoading}
            isEditable={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
