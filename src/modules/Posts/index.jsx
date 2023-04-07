import React from 'react';
import { Post } from 'components/Post';
import { SearchString } from 'components/SearchString';
import { AlertMessage } from 'components/AlertMessage';
import { useAlertMessage } from 'hooks/useAlertMessage';
import { PostsPagination } from './PostsPagination';
import { useSelector } from 'react-redux';

export const Posts = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const { posts } = useSelector((state) => state.posts);

  React.useEffect(() => {
    if (posts.items) {
      setIsLoading(false);
    }

    if (posts.status === 'removed') {
      setAlertOptions(true, 'success', 'Статья успешно удалена!');
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
