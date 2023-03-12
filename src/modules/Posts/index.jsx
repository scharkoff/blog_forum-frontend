import React from 'react';

// -- Redux state
import store from 'redux/store';

// -- Components
import { Post } from 'components/Post';
import { SearchString } from 'components/SearchString';

// -- React-redux
import { useSelector } from 'react-redux';
import { AlertMessage } from 'components/AlertMessage';

export const Posts = () => {
  const state = store.getState();

  const { posts } = state.posts;

  const [postsArray, setPostsArray] = React.useState([]);
  const [copyOfPosts, setCopyOfPosts] = React.useState([]);

  React.useEffect(() => {
    if (posts.items) {
      setPostsArray(posts.items);
      setCopyOfPosts(posts.items);
    }
  }, [posts.items]);

  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === 'loading';

  // -- Уведомления
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

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
            setOpen={setOpen}
            setAlertText={setAlertText}
            setAlertType={setAlertType}
          />
        )
      )}
    </div>
  );
};
