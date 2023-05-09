import React from 'react';
import useAlertMessage from 'hooks/useAlertMessage';
import { PostsPagination } from './PostsPagination';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, Post, SearchString } from 'components';
import { resetIsPostRemoved } from 'redux/slices/posts';

export const Posts = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const { posts } = useSelector((state) => state.posts);

  React.useEffect(() => {
    if (posts.items) {
      setIsLoading(false);
    }

    if (posts.isPostRemoved) {
      setAlertOptions(true, 'success', 'Статья успешно удалена!');
      dispatch(resetIsPostRemoved());
    }
  }, [posts.items]);

  if (isLoading) {
    return (
      <div>
        {[...Array(5)].map((_, index) => {
          return <Post key={index} isLoading={true} />;
        })}
      </div>
    );
  }

  return (
    <div>
      <AlertMessage {...alertVariables} />
      <SearchString />
      <PostsPagination posts={posts.items} />
    </div>
  );
};
