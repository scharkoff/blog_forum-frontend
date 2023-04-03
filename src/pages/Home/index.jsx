import React, { useMemo } from 'react';

import Grid from '@mui/material/Grid';
import { SortTabs } from 'components';
import { TagsBlock } from 'components/TagsBlock';
import { CommentsBlock } from 'components/CommentsBlock';
import { Posts } from 'modules/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from 'redux/slices/tags';
import { fetchAuthMe } from 'redux/slices/auth';
import { fetchComments, fetchLastsComments } from 'redux/slices/comments';
import styles from './Home.module.scss';
import { setActiveTag } from 'redux/slices/posts';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();

  const tag = useParams();

  const { comments, tags, status, isHomePage } = useSelector(
    useMemo(
      () => (state) => ({
        comments: state.posts.comments,
        tags: state.posts.tags,
        status: state.posts.comments?.status,
        isHomePage: state.posts.posts?.home,
      }),
      []
    )
  );

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (status === 'loaded') {
      setIsLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    document.title = 'Главная страница';
    dispatch(fetchTags());
    dispatch(fetchLastsComments());
    dispatch(fetchComments());
    dispatch(fetchAuthMe());
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
