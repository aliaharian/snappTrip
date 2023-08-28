import React, { useState, useCallback } from "react";
import _ from "lodash";
import { FormErrors, FormFields, UseFormOptions } from "./types";

const useForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions) => {
  const [values, setValues] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormFields>({});

  const handleChange = useCallback((name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((name: string) => {
    setTouched((prevTouched: any) => ({
      ...prevTouched,
      [name]: true,
    }));
  }, []);

  const validateForm = useCallback(async () => {
    if (!validationSchema) {
      return {};
    }

    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (validationErrors: any) {
      const fieldErrors: FormErrors = {};
      validationErrors.inner.forEach((error: any) => {
        if (error.path) {
          _.set(fieldErrors, error.path, error.message);
        }
      });
      return fieldErrors;
    }
  }, [validationSchema, values]);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      if (event) {
        event.preventDefault();
      }

      const fieldErrors = await validateForm();
      setErrors(fieldErrors);

      if (_.isEmpty(fieldErrors)) {
        onSubmit(values);
      }
    },
    [onSubmit, validateForm, values]
  );

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
