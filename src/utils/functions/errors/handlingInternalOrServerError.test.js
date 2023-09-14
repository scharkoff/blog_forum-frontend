import handlingInternalOrServerError from 'utils/functions/errors/handlingInternalOrServerError';

describe('Фукнция обработки ошибок handlingInternalOrServerError', () => {
  test('Ответ без поля payload', () => {
    const setAlertOptions = jest.fn();

    handlingInternalOrServerError({ payload: null }, setAlertOptions);

    expect(setAlertOptions).toHaveBeenCalledWith(
      true,
      'error',
      'Серверная ошибка. Пожалуйста, попробуйте позже',
    );
  });

  test('Ответ с серверной ошибкой', () => {
    const setAlertOptions = jest.fn();

    handlingInternalOrServerError(
      { error: true, payload: { message: 'Server Error' } },
      setAlertOptions,
    );

    expect(setAlertOptions).toHaveBeenCalledWith(true, 'error', 'Server Error');
  });

  test('Ответ с ошибками валидации', () => {
    const setAlertOptions = jest.fn();

    handlingInternalOrServerError(
      { error: true, payload: [{ msg: 'Error 1' }, { msg: 'Error 2' }] },
      setAlertOptions,
    );

    expect(setAlertOptions).toHaveBeenCalledWith(true, 'error', 'Error 1');
  });

  test('Успешный ответ', () => {
    const setAlertOptions = jest.fn();

    handlingInternalOrServerError(
      { payload: { message: 'Success!' } },
      setAlertOptions,
    );

    expect(setAlertOptions).toHaveBeenCalledWith(true, 'success', 'Success!');
  });
});
