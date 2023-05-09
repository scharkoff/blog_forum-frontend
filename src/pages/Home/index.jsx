import React from 'react';
import styles from './Home.module.scss';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Posts } from 'modules';
import { CommentsBlock, SortTabs, TagsBlock } from 'components';

export const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const { lastCommets, tags, isPostsLoading } = useSelector(
    React.useMemo(
      () => (state) => ({
        lastCommets: state.posts.lastComments,
        tags: state.posts.tags,
        isPostsLoading: state.posts.posts.isLoading,
      }),
      [],
    ),
  );

  React.useEffect(() => {
    if (!isPostsLoading) {
      setIsLoading(false);
    }
  }, [isPostsLoading]);

  React.useEffect(() => {
    document.title = 'Главная страница';
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
