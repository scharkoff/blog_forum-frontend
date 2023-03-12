import React from 'react';

// -- Material UI
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { AlertMessage } from 'components/AlertMessage';

// -- Material UI simple editor
import SimpleMDE from 'react-simplemde-editor';

// -- Styles
import 'easymde/dist/easymde.min.css';
import styles from './scss/AddPost.module.scss';

// -- React-redux
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// -- Redux state
import { selectIsAuth } from 'redux/slices/auth';

// -- Axios
import axios from 'configs/axios/axios';
import { onSubmitPost } from './api/submitPost';
import { handleChangeFile } from './api/handleChangeFile';

export const AddPostForm = () => {
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const { id } = useParams();

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [authorId, setAuthorId] = React.useState('');

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  React.useEffect(() => {
    document.title = 'Добавить пост';
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);
          setAuthorId(data.user?._id);
        })
        .catch((err) => {
          setAlertText('Ошибка при получении статьи!');
          setAlertType('error');
          setOpen(true);
        });
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
    setLoading,
    setAlertText,
    setAlertType,
    setOpen,
    navigate,
    id,
  };

  const handleChangeFileDTO = {
    setImageUrl,
    setAlertText,
    setAlertType,
    setOpen,
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

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
