import React from 'react';

const useAlertMessage = () => {
  const [open, setOpen] = React.useState(false),
    [alertText, setAlertText] = React.useState(''),
    [alertType, setAlertType] = React.useState('info');

  const setAlertOptions = (visability, type, text) => {
    setOpen(visability);
    setAlertText(text);
    setAlertType(type);
  };

  return [{ open, alertText, alertType, setOpen }, setAlertOptions];
};

export default useAlertMessage;
