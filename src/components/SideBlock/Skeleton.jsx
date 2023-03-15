import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SideBlockSkeleton = () => {
  return (
    <Box sx={{ width: 362 }}>
      <Skeleton sx={{ height: 303 }} />
    </Box>
  );
};

export default SideBlockSkeleton;
