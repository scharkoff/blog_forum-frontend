import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBlock.module.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const SideBlock = ({ title, children }) => {
  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

SideBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
