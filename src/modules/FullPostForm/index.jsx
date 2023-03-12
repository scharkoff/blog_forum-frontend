import React from 'react';

// -- Components
import { Post } from 'components/Post';
import { AddComment } from 'components/AddComment';
import { CommentsBlock } from 'components/CommentsBlock';

// -- React markdown
import ReactMarkdown from 'react-markdown';

// -- React-redux
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// -- Axios
import axios from 'configs/axios/axios';

// -- Redux state
import { fetchComments } from 'redux/slices/comments';
import { AlertMessage } from 'components/AlertMessage';

export const FullPostForm = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const allComments = useSelector((state) => state.posts.comments.items);

  const dispatch = useDispatch();

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  React.useEffect(() => {
    dispatch(fetchComments());
  }, []);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setAlertText('Ошибка при получении статьи!');
        setOpen(true);
        setAlertType('error');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${
                data.imageUrl
              }`
            : ''
        }
        user={data.user}
        createdAt={data.createdAt.slice(0, 10)}
        viewsCount={data.viewsCount}
        commentsCount={
          allComments
            ? allComments.filter((item) => item.post?._id === id).length
            : 0
        }
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={
          allComments
            ? allComments
                .filter((item) => item.post?._id === id)
                .map((item) => {
                  return {
                    user: {
                      userId: item.user?._id,
                      fullName: item.user?.fullName,
                      avatarUrl: item.user?.avatarUrl,
                      rank: item.user?.rank,
                    },
                    text: item.text,
                    commentId: item._id,
                  };
                })
            : []
        }
        isLoading={false}
        isEditble={true}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
