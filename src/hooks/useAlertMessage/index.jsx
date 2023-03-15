import React from 'react';

export const useAlertMessage = () => {
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  const setAlertOptions = (visability, type, text) => {
    setOpen(visability);
    setAlertText(text);
    setAlertType(type);
  };

  return [{ open, alertText, alertType, setOpen }, setAlertOptions];
};
