const handlingInternalOrServerError = (response, setAlertOptions) => {
  if (!response.payload) {
    return setAlertOptions(
      true,
      'error',
      'Серверная ошибка. Пожалуйста, попробуйте позже',
    );
  }

  if ('error' in response) {
    const errorMessage = Array.isArray(response.payload)
      ? response.payload[0]?.msg
      : response.payload?.message ||
        'Серверная ошибка. Пожалуйста, попробуйте позже';

    return setAlertOptions(true, 'error', errorMessage);
  }

  return setAlertOptions(true, 'success', response.payload?.message);
};

export default handlingInternalOrServerError;
