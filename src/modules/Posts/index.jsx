import React from 'react';

import store from 'redux/store';

import { Post } from 'components/Post';
import { SearchString } from 'components/SearchString';
import { AlertMessage } from 'components/AlertMessage';
import { useAlertMessage } from 'hooks/useAlertMessage';
import { PostsPagination } from './PostsPagination';

export const Posts = () => {
  const state = store.getState();

  const { posts } = state.posts;

  const [postsArray, setPostsArray] = React.useState([]);
  const [copyOfPosts, setCopyOfPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    if (posts.items) {
      setPostsArray(posts.items);
      setCopyOfPosts(posts.items);
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
      <SearchString setPostsArray={setPostsArray} copyOfPosts={copyOfPosts} />
      <PostsPagination postsArray={postsArray} />
    </div>
  );
};
