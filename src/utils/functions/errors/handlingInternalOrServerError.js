export const handlingInternalOrServerError = (response, setAlertOptions) => {
  if (response.payload?.isError) {
    setAlertOptions(
      true,
      'error',
      response.payload?.message
        ? response.payload?.message
        : response.payload[0]?.msg,
    );
  } else {
    setAlertOptions(true, 'success', response.payload?.message);
  }
};
