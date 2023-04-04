import React from 'react';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from 'redux/slices/comments';
import axios from 'configs/axios/axios';
import { closeCommentEditMode } from 'redux/slices/posts';

export const AddComment = () => {
  const dispatch = useDispatch();

  const [text, setText] = React.useState('');

  const { id } = useParams();

  const { editMode } = useSelector((state) => state.posts.comments);
  const { editbleComment } = useSelector((state) => state.posts.comments);
  const { userData } = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    if (editbleComment) {
      setText(editbleComment.text);
    }
  }, [editbleComment]);

  React.useEffect(() => {
    setText('');
  }, [id]);

  const onSubmit = async () => {
    try {
      const fields = {
        commentId: editMode ? editbleComment.commentId : null,
        fullName: userData.fullName,
        text,
        avatarUrl: userData.avatarUrl,
        post: id,
      };
      !editMode
        ? await axios.post(`/comments/${id}`, fields)
        : await axios.patch(`/comments/${id}`, fields);
      dispatch(fetchComments());
      setText('');
    } catch (error) {
      alert('Ошибка при создании комментария!');
    }
  };

  const onCancel = async () => {
    dispatch(closeCommentEditMode());
    setText('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={
            userData
              ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${
                  userData.avatarUrl
                }`
              : ''
          }
        />
        <div className={styles.form}>
          <TextField
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            disabled={userData?._id ? false : true}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={!text ? true : false}
            color={editMode ? 'secondary' : 'primary'}
          >
            {!editMode ? 'Отправить' : 'Сохранить'}
          </Button>

          {editMode ? (
            <Button
              style={{ marginLeft: 10 }}
              onClick={onCancel}
              color={editMode ? 'secondary' : 'primary'}
            >
              Отменить
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
