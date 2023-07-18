import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

export const skeletonItems = Array.from({ length: 5 }, (_, i) => (
  <React.Fragment key={i}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Skeleton variant="text" height={25} width={120} />
        <Skeleton variant="text" height={18} width={230} />
      </div>
      <Divider variant="inset" component="li" />
    </ListItem>
  </React.Fragment>
));
