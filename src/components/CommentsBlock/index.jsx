import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import styles from '../UserInfo/UserInfo.module.scss';
import { SideBlock } from '../SideBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIsAuth } from 'redux/slices/auth.js';
import { fetchRemoveComment } from 'redux/slices/comments';
import { setEditCommentValues } from 'redux/slices/posts';

export const CommentsBlock = React.memo(
  ({ comments = [], setComments, children, isLoading = true, isEditble }) => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const id = useParams();

    const userId = useSelector((state) => state.auth.data.userData?._id);
    const userRank = useSelector((state) => state.auth.data.userData?.rank);

    function onRemoveComment(commentId) {
      if (window.confirm('Вы действительно хотите удалить комментарий?')) {
        dispatch(fetchRemoveComment({ commentId }));
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    }

    function onEditComment(commentId, text) {
      dispatch(setEditCommentValues({ id, commentId, text }));
    }

    return (
      <SideBlock title="Комментарии">
        <List>
          {(isLoading && !comments ? [...Array(5)] : comments).map(
            (comment) => (
              <React.Fragment key={comment._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {isLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar
                        alt={comment.user?.fullName}
                        src={`${process.env.REACT_APP_API_URL}${comment.user.avatarUrl}`}
                      />
                    )}
                  </ListItemAvatar>
                  {isLoading ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Skeleton variant="text" height={25} width={120} />
                      <Skeleton variant="text" height={18} width={230} />
                    </div>
                  ) : (
                    <>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              sx={{
                                display: 'inline',
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.user?.fullName}
                            </Typography>
                            <span
                              className={
                                comment.user?.rank === 'user'
                                  ? styles.rank
                                  : styles.admin
                              }
                            >
                              {' ' + comment.user?.rank}
                            </span>
                          </React.Fragment>
                        }
                        secondary={comment.text}
                      />
                      {(isAuth && isEditble && userId === comment.user?._id) ||
                      (userRank === 'admin' && isAuth && isEditble) ? (
                        <>
                          <IconButton
                            onClick={() => onRemoveComment(comment._id)}
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              onEditComment(comment._id, comment.text)
                            }
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      ) : null}
                    </>
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ),
          )}
        </List>
        {children}
      </SideBlock>
    );
  },
);

CommentsBlock.propTypes = {
  comments: PropTypes.array,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  isEditble: PropTypes.bool,
};
