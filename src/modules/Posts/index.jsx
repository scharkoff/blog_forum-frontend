import React from 'react';
import useAlertMessage from 'hooks/useAlertMessage';
import { PostsPagination } from './PostsPagination';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, Post, SearchString } from 'components';
import { resetIsPostRemoved } from 'redux/slices/posts';

export const Posts = () => {
  const dispatch = useDispatch();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const { items, isPostRemoved, isLoading } = useSelector(
    (state) => state.posts.posts,
  );

  React.useEffect(() => {
    if (isPostRemoved) {
      setAlertOptions(true, 'success', 'Статья успешно удалена!');
      dispatch(resetIsPostRemoved());
    }
  }, [isPostRemoved]);

  return (
    <div>
      <AlertMessage {...alertVariables} />
      <SearchString />
      <PostsPagination posts={items} isLoading={isLoading} />
    </div>
  );
};
