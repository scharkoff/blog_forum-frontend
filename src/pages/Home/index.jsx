import React, { useMemo } from 'react';

import Grid from '@mui/material/Grid';
import { SortTabs } from 'components';
import { TagsBlock } from 'components/TagsBlock';
import { CommentsBlock } from 'components/CommentsBlock';
import { Posts } from 'modules/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from 'redux/slices/tags';
import { fetchComments, fetchLastsComments } from 'redux/slices/comments';
import styles from './Home.module.scss';
import { setActiveTag } from 'redux/slices/posts';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();

  const tag = useParams();

  const [isLoading, setIsLoading] = React.useState(true);

  const { lastCommets, tags, status } = useSelector(
    useMemo(
      () => (state) => ({
        lastCommets: state.posts.lastComments,
        tags: state.posts.tags,
        status: state.posts.posts.status,
      }),
      [],
    ),
  );

  React.useEffect(() => {
    if (status === 'loaded') {
      setIsLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    document.title = 'Главная страница';
    dispatch(fetchTags());
    dispatch(fetchLastsComments());
    dispatch(setActiveTag(tag.name));
  }, []);

  return (
    <>
      <SortTabs />

      <Grid container spacing={4} className={styles.contentWrapper}>
        <Grid xs={8} item className={styles.posts}>
          <Posts />
        </Grid>

        <Grid xs={4} item className={styles.tags}>
          <TagsBlock tags={tags.items} isLoading={isLoading} />
          <CommentsBlock
            className={styles.comments}
            comments={lastCommets.items}
            isLoading={isLoading}
            isEditable={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
