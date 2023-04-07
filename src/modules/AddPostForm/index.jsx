import React from 'react';
import { Img } from 'react-image';
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

  const isEditing = Boolean(id);

  const navigate = useNavigate();

  const [alertVariables, setAlertOptions] = useAlertMessage();

  const inputFileRef = React.useRef(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [createPostFields, setCreatePostFields] = React.useState({
    text: '',
    title: '',
    imageUrl: '',
    tags: '',
    authorId: '',
  });

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
          setCreatePostFields({
            ...createPostFields,
            title: data.post?.title,
            text: data.post?.text,
            imageUrl: data.post?.imageUrl,
            tags: data.post?.tags,
            authorId: data.post?.user?._id,
          });
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
    setCreatePostFields({
      ...createPostFields,
      imageUrl: '',
    });
  };

  const onChange = (value) => {
    setCreatePostFields({
      ...createPostFields,
      text: value,
    });
  };

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
    [],
  );

  const submitPostProps = {
    ...createPostFields,
    isEditing,
    setAlertOptions,
    navigate,
    id,
    dispatch,
  };

  const handleChangeFileProps = {
    createPostFields,
    setCreatePostFields,
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
          onChange={(e) => handleChangeFile(e, handleChangeFileProps)}
          hidden
        />
        {createPostFields.imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Удалить
            </Button>
            <Img
              className={styles.image}
              src={`${
                process.env.REACT_APP_API_URL || 'http://localhost:4444'
              }${createPostFields.imageUrl}`}
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
          value={createPostFields.title}
          onChange={(e) =>
            setCreatePostFields({ ...createPostFields, title: e.target.value })
          }
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги через запятую, например: лето, зима, весна"
          value={createPostFields.tags}
          onChange={(e) =>
            setCreatePostFields({ ...createPostFields, tags: e.target.value })
          }
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={createPostFields.text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            onClick={() => onSubmitPost(submitPostProps)}
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
