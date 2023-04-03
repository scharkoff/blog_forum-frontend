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
import { fetchPosts, setActiveTag } from 'redux/slices/posts';

export const TagsBlock = React.memo(({ tags, isLoading = true }) => {
  const dispatch = useDispatch();

  const { activeTag } = useSelector((state) => state.posts?.tags);
  const { activeTabs } = useSelector((state) => state.utils);

  const [activeTagName, setActiveTagName] = React.useState(null);

  const { name } = useParams();

  React.useEffect(() => {
    setActiveTagName(name);
  }, []);

  React.useEffect(() => {
    if (!name) setActiveTagName(null);
  }, [activeTag]);

  const onGetPosts = (name) => {
    dispatch(setActiveTag(name));
    dispatch(
      fetchPosts({
        pageOptions: [1, 5],
        activeTabs,
        tagName: name,
      }),
    );
    setActiveTagName(name);
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : tags).map((tagName, i) => (
          <Link
            key={i}
            style={{
              textDecoration: 'none',
              color: activeTagName === tagName ? 'white' : 'black',
            }}
            to={`/tags/${tagName}`}
          >
            <ListItem
              style={{
                backgroundColor:
                  activeTagName === tagName ? '#4361ee' : 'white',
              }}
              key={i}
              onClick={() => {
                dispatch(setActivePage(0));
                onGetPosts(tagName);
                dispatch(resetSearchString(new Date().valueOf()));
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon
                    style={{
                      color: activeTagName === tagName ? 'white' : '',
                    }}
                  />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton variant="text" width={274} height={24} />
                ) : (
                  <ListItemText primary={tagName} />
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
  tags: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};
