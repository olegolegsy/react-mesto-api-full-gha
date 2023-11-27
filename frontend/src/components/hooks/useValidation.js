import { useCallback, useState } from "react";

const useValidation = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  const handleChange = (evt) => {
    const name = evt.target.name;

    setValue((prevValue) => {
      return { ...prevValue, [name]: evt.target.value };
    });
    setError((prevValue) => {
      return { ...prevValue, [name]: evt.target.validationMessage };
    });
    setIsInputValid((prevValue) => {
      return { ...prevValue, [name]: evt.target.validity.valid };
    });

    setIsValid(evt.target.form.checkValidity());
  };
  const reset = (data = {}) => {
    setValue(data);
    setError({});
    setIsValid(false);
    setIsInputValid({});
  };

  const setValues = useCallback((name, value) => {
    setValue((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }, []);

  return {
    handleChange,
    reset,
    setValues,
    value,
    error,
    isValid,
    isInputValid,
  };
};
export default useValidation;
