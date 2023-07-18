import React from 'react';
import ListItem from '@mui/material/ListItem';
import TagIcon from '@mui/icons-material/Tag';
import Skeleton from '@mui/material/Skeleton';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const skeletonItems = Array.from({ length: 5 }, (_, i) => (
  <ListItem
    style={{
      backgroundColor: 'white',
    }}
    key={i}
    disablePadding
  >
    <ListItemButton>
      <ListItemIcon>
        <TagIcon />
      </ListItemIcon>

      <ListItemText
        primary={<Skeleton variant="text" width={274} height={24} />}
      />
    </ListItemButton>
  </ListItem>
));
