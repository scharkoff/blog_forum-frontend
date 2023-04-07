import React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SideBlock } from '../SideBlock';
import { resetSearchString, setActivePage } from 'redux/slices/utils';
import { setActiveTag } from 'redux/slices/posts';

export const TagsBlock = React.memo(({ tags = [], isLoading = true }) => {
  const dispatch = useDispatch();

  const { activeTag } = useSelector((state) => state.posts.tags);

  const { name } = useParams();

  React.useEffect(() => {
    if (!name) {
      dispatch(setActiveTag(null));
    } else {
      dispatch(setActiveTag(name));
    }
  }, [name]);

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading && !tags ? [...Array(5)] : tags).map((tag) => (
          <Link
            key={tag}
            style={{
              textDecoration: 'none',
              color: activeTag === tag ? 'white' : 'black',
            }}
            to={`/tags/${tag}`}
          >
            <ListItem
              style={{
                backgroundColor: activeTag === tag ? '#4361ee' : 'white',
              }}
              key={tag}
              onClick={() => {
                dispatch(setActivePage(0));
                dispatch(setActiveTag(tag));
                dispatch(resetSearchString(new Date().valueOf()));
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon
                    style={{
                      color: activeTag === tag ? 'white' : '',
                    }}
                  />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton variant="text" width={274} height={24} />
                ) : (
                  <ListItemText primary={tag} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
});

TagsBlock.propTypes = {
  tags: PropTypes.array,
  isLoading: PropTypes.bool,
};
