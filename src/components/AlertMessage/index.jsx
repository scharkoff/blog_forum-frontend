import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const AlertMessage = ({ open, alertText, alertType, setOpen }) => {
  return (
    <Alert
      style={{ display: !open ? 'none' : 'flex', marginBottom: 20 }}
      severity={alertType}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {alertText}
    </Alert>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  opened: PropTypes.bool,
  setOpen: PropTypes.func,
};
