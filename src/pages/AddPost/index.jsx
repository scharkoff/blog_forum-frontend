import React from "react";

// -- Material UI
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// -- Material UI simple editor
import SimpleMDE from "react-simplemde-editor";

// -- Styles
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

// -- React-redux
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// -- Redux state
import { selectIsAuth } from "../../redux/slices/auth";

// -- Axios
import axios from "../../axios";

export const AddPost = () => {
  // -- Проверка на авторизацию
  const isAuth = useSelector(selectIsAuth);

  // -- Навигация rrd
  const navigate = useNavigate();

  // -- id поста
  const { id } = useParams();

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- useState
  const [text, setText] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [title, setTitle] = React.useState("");

  // -- useRef
  const inputFileRef = React.useRef(null);

  // -- Проверка на режим редактирования
  const isEditing = Boolean(id);

  // -- Загрузка изображения к посту
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Не удалось загрузить изображение!");
    }
  };

  // -- useEffect
  React.useEffect(() => {
    document.title = "Добавить пост";
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при получении статьи!");
        });
    }
  }, []);

  // -- Functions
  // -- Обработка клика по кнопке "Удалить" картинку
  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  // -- Обработка клика по кнопке "Опубликовать" пост
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        text,
        imageUrl,
        tags: Array.isArray(tags) ? tags : tags.replaceAll(" ", "").split(","),
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts/create", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      setAlertText(error.response.data[0].msg);
      setAlertType("error");
      setOpen(true);
    }
  };

  // -- useCallback for simple editor
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  // -- Опции для simple editor
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  // -- Если не авторизировался, перебросить на главный экран
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Alert
        style={{ display: !open ? "none" : "flex", marginBottom: 20 }}
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertText}
      </Alert>
      <Paper elevation={0} style={{ padding: 30 }}>
        <Button
          onClick={() => inputFileRef.current.click()}
          variant="outlined"
          size="large"
        >
          Загрузить превью
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
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
              src={`http://localhost:4444${imageUrl}`}
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
          placeholder="Тэги"
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
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? "Сохранить" : "Опубликовать"}
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="secondary" size="large" variant="outlined">
              Отмена
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};
