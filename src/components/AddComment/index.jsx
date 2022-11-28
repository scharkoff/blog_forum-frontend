import React from "react";

// -- Styles
import styles from "./AddComment.module.scss";

// -- Material UI
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// -- React-redux
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// -- Redux state
import {
  fetchCancelEditMode,
  fetchComments,
} from "../../redux/slices/comments";

// -- Axios
import axios from "../../axios";

export const Index = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- useState
  const [user, setUser] = React.useState(null);
  const [text, setText] = React.useState("");

  // -- useParams
  const { id } = useParams();

  // -- useSelector
  const { editMode } = useSelector((state) => state.posts.comments);
  let { editbleComment } = useSelector((state) => state.posts.comments);
  // -- User data
  const { data } = useSelector((state) => state.auth);

  // -- useEffect
  // -- Проверка на авторизацию
  React.useEffect(() => {
    axios.get("/auth/me").then((res) => {
      setUser(res.data);
    });
  }, []);

  // -- Установка текста для редактирования существующего комментария
  React.useEffect(() => {
    if (editbleComment) {
      setText(editbleComment.text);
    }
  }, [editbleComment]);

  // -- Сбрасывать значение комментария в режиме редактирования при выходе со страницы
  React.useEffect(() => {
    setText("");
  }, [id]);

  // -- Functions
  // -- Обработка клика по кнопке "Отправить" и "Сохранить"
  const onSubmit = async () => {
    try {
      const fields = {
        commentId: editMode ? editbleComment.commentId : null,
        fullName: user.fullName,
        text,
        avatarUrl: user.avatarUrl,
        post: id,
      };
      !editMode
        ? await axios.post(`/posts/${id}/addComment`, fields)
        : await axios.patch(`/posts/${id}/updateComment`, fields);
      dispatch(fetchComments());
      setText("");
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании комментария!");
    }
  };

  // -- Обработка клика по кнопке "Отменить"
  const onCancel = async () => {
    dispatch(fetchCancelEditMode());
    setText("");
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user ? `http://localhost:4444${user.avatarUrl}` : ""}
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
            disabled={!data ? true : false}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={!text ? true : false}
            color={editMode ? "secondary" : "primary"}
          >
            {!editMode ? "Отправить" : "Сохранить"}
          </Button>

          {editMode ? (
            <Button
              style={{ marginLeft: 10 }}
              onClick={onCancel}
              color={editMode ? "secondary" : "primary"}
            >
              Отменить
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
