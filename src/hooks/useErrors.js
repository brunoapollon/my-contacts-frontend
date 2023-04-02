import { useCallback, useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors]);

  const removeError = useCallback((fieldName) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => {
    const errorFound = errors.find((error) => error.field === fieldName);

    return errorFound ? errorFound.message : '';
  }, [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
