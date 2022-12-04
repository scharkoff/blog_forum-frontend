import React from "react";

// -- clsx for css
import clsx from "clsx";

// -- Styles
import styles from "./Post.module.scss";

// -- Material UI
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

// React-redux
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// -- Components
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";

// -- Redux state
import { fetchRemovePost } from "../../redux/slices/posts";
import { fetchPostsLikeTag } from "../../redux/slices/tags";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  alert,
}) => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Auth user data
  const authUser = useSelector((state) => state.auth.data);

  // -- Скелет при загрузке страницы
  if (isLoading) {
    return <PostSkeleton />;
  }

  // -- Обработка клика по кнопке "Удалить статью"
  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      try {
        dispatch(fetchRemovePost(id));
        alert.setAlertText("Пост успешно удален!");
        alert.setAlertType("success");
        alert.setOpen(true);
      } catch (error) {
        alert.setAlertText("Произошла ошибка при удалении поста!");
        alert.setAlertType("error");
        alert.setOpen(true);
      }
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable || authUser?.rank === "admin" ? (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      ) : (
        ""
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name} onClick={() => dispatch(fetchPostsLikeTag(name))}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
