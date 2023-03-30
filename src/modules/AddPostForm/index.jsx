import React from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { AlertMessage } from 'components/AlertMessage';

import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './scss/AddPost.module.scss';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'configs/axios/axios';
import { onSubmitPost } from './api/submitPost';
import { handleChangeFile } from './api/handleChangeFile';
import { useAlertMessage } from 'hooks/useAlertMessage';

export const AddPostForm = ({ id }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const [text, setText] = React.useState(''),
    [imageUrl, setImageUrl] = React.useState(''),
    [tags, setTags] = React.useState(''),
    [title, setTitle] = React.useState(''),
    [authorId, setAuthorId] = React.useState(''),
    inputFileRef = React.useRef(null),
    [isLoading, setIsLoading] = React.useState(true);

  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (isEditing) {
      document.title = 'Редактировать запись';
    } else {
      document.title = 'Создать новую запись';
    }

    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.post?.title);
          setText(data.post?.text);
          setImageUrl(data.post?.imageUrl);
          setTags(data.post?.tags);
          setAuthorId(data.post?.user?._id);
          setIsLoading(false);
        })
        .catch((error) => {
          setAlertOptions(true, 'error', error.response.data?.message);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const submitPostDTO = {
    title,
    text,
    imageUrl,
    tags,
    authorId,
    isEditing,
    setAlertOptions,
    navigate,
    id,
    dispatch,
  };

  const handleChangeFileDTO = {
    setImageUrl,
    setAlertOptions,
  };

  if (isLoading) {
    return (
      <div>
        <AlertMessage {...alertVariables} />
      </div>
    );
  }

  return (
    <div>
      <AlertMessage {...alertVariables} />

      <Paper elevation={0} style={{ padding: 30 }}>
        <Button
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="medium"
          style={{ marginRight: 10 }}
        >
          Загрузить превью
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          name="image"
          onChange={(e) => handleChangeFile(e, handleChangeFileDTO)}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
            <img
              className={styles.image}
              src={`${
                process.env.REACT_APP_API_URL || 'http://localhost:4444'
              }${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги через запятую, например: лето, зима, весна"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            onClick={() => onSubmitPost(submitPostDTO)}
            size="large"
            variant="contained"
          >
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button color="secondary" size="large" variant="outlined">
              Отмена
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};
