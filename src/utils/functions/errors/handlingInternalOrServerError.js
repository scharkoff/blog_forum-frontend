const handlingInternalOrServerError = (response, setAlertOptions) => {
  if (response.payload) {
    return setAlertOptions(true, 'success', response.payload.message);
  }

  if (response.error) {
    return setAlertOptions(true, 'error', response.error.message);
  }

  return setAlertOptions(
    true,
    'error',
    'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз',
  );
};

export default handlingInternalOrServerError;
