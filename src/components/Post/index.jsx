import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Post.module.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from 'redux/slices/posts';

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
}) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.data.userData);

  const navigate = useNavigate();

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      try {
        dispatch(fetchRemovePost(id));

        if (isFullPost) {
          return navigate('/');
        }
      } catch (error) {
        if (isFullPost) {
          return navigate('/');
        }
      }
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable ||
      authUser?.rank === 'admin' ||
      user?._id === authUser?._id ? (
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
        ''
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}>
          <img
            className={clsx(styles.image, {
              [styles.imageFull]: isFullPost,
            })}
            src={imageUrl}
            onError={(e) =>
              (e.target.src = `${process.env.REACT_APP_API_URL}/uploads/no-post-photo.png`)
            }
            alt={title}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, {
              [styles.titleFull]: isFullPost,
            })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
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

Post.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  imageUrl: PropTypes.string,
  user: PropTypes.object,
  viewsCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.array,
  children: PropTypes.node,
  isFullPost: PropTypes.bool,
  isLoading: PropTypes.bool,
  isEditable: PropTypes.bool,
  setOpen: PropTypes.func,
  setAlertText: PropTypes.func,
  setAlertType: PropTypes.func,
};
