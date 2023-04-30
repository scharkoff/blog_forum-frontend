import React from 'react';
import axios from 'configs/axios/axios';
import ReactMarkdown from 'react-markdown';
import useAlertMessage from 'hooks/useAlertMessage';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchComments } from 'redux/slices/comments';
import { AddComment, AlertMessage, CommentsBlock, Post } from 'components';

export const FullPostForm = () => {
  const [postData, setPostData] = React.useState(),
    [isLoading, setLoading] = React.useState(true),
    [comments, setComments] = React.useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  React.useEffect(() => {
    dispatch(fetchComments());
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPostData(res.data.post);
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setAlertOptions(true, 'error', error.response.data?.message);
      });
  }, []);

  React.useEffect(() => {
    if (postData) {
      document.title = postData.title;
    }
  }, [postData]);

  if (isLoading) {
    return (
      <div>
        <AlertMessage {...alertVariables} />
        <Post isLoading={isLoading} />
      </div>
    );
  }

  return (
    <>
      <AlertMessage {...alertVariables} />

      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={
          postData.imageUrl
            ? `${process.env.REACT_APP_API_URL}${postData.imageUrl}`
            : ''
        }
        user={postData.user}
        createdAt={postData.createdAt.slice(0, 10)}
        viewsCount={postData.viewsCount}
        commentsCount={
          comments
            ? comments.filter((comment) => comment.post?._id === id).length
            : 0
        }
        tags={postData.tags}
        isFullPost
      >
        <ReactMarkdown>{postData.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        setComments={setComments}
        comments={comments}
        isLoading={false}
        isEditble={true}
      >
        <AddComment comments={comments} setComments={setComments} />
      </CommentsBlock>
    </>
  );
};
