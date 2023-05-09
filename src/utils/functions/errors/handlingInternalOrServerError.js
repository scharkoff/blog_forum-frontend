const handlingInternalOrServerError = (response, setAlertOptions) => {
  if (response.payload) {
    return setAlertOptions(true, 'success', response.payload.message);
  }

  if (response.error) {
    return setAlertOptions(true, 'error', response.error.message);
  }

  return setAlertOptions(true, 'info', 'Произошла непредвиденная ситуация');
};

export default handlingInternalOrServerError;
