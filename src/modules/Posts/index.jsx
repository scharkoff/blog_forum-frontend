import React from 'react';

import store from 'redux/store';

import { Post } from 'components/Post';
import { SearchString } from 'components/SearchString';

import { useSelector } from 'react-redux';
import { AlertMessage } from 'components/AlertMessage';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const Posts = () => {
  const state = store.getState();

  const { posts } = state.posts;

  const [postsArray, setPostsArray] = React.useState([]);
  const [copyOfPosts, setCopyOfPosts] = React.useState([]);

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    if (posts.items) {
      setPostsArray(posts.items);
      setCopyOfPosts(posts.items);
    }

    if (posts.status === 'removed') {
      setAlertOptions(true, 'success', 'Статья успешно удалена!');
    }
  }, [posts.items]);

  const userData = useSelector((state) => state.auth?.data);

  const isPostsLoading = posts.status === 'loading';

  return (
    <div>
      <AlertMessage {...alertVariables} />

      <SearchString setPostsArray={setPostsArray} copyOfPosts={copyOfPosts} />

      {(isPostsLoading ? [...Array(5)] : postsArray).map((obj, index) =>
        isPostsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            key={index}
            id={obj._id}
            title={obj.title}
            imageUrl={
              obj.imageUrl
                ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${
                    obj.imageUrl
                  }`
                : ''
            }
            user={obj.user}
            createdAt={obj.createdAt.slice(0, 10)}
            viewsCount={obj.viewsCount}
            commentsCount={obj.commentsCount}
            tags={obj.tags}
            isEditable={userData?._id === obj?.user?._id}
          />
        )
      )}
    </div>
  );
};
