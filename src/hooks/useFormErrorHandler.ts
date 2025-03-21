import { useState } from "react";
import { UseFormReturnType } from "@mantine/form"; // Import Mantine's form type
import { ErrorResponse } from "../api/errors/errror.types";
import { ERROR_TYPES } from "../api/errors/error.constants";

function useFormErrorHandler<T>() {
  const [error, setError] = useState<string | null>(null);

  function handleAuthFormErrors(
    err: ErrorResponse,
    form: UseFormReturnType<T>
  ) {
    if (err.type === ERROR_TYPES.VALIDATION_ERROR) {
      form.setErrors(err.errors);
    } else if (err.type === ERROR_TYPES.NOT_FOUND_ERROR) {
      form.setFieldError("email", "Invalid username or password");
    } else if (err.type === ERROR_TYPES.UNEXPECTED_ERROR) {
      setError(
        "An unexpected error has occurred, and we could not log you in."
      );
    }
  }

  function handleFormErrors(err: ErrorResponse, form: UseFormReturnType<T>) {
    if (err.type === ERROR_TYPES.VALIDATION_ERROR) {
      console.log(err.errors);
  
      const modifiedErrors = Object.keys(err.errors).reduce((acc, key) => {
        const modifiedKey = key.charAt(0).toLowerCase() + key.slice(1); // Make the first letter lowercase
        acc[modifiedKey] = err.errors[key];
        return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as Record<string, any>);
  
      form.setErrors(modifiedErrors);
    }
  }
  

  function resetError() {
    setError(null);
  }

  return { error, resetError, handleFormErrors, handleAuthFormErrors };
}

export default useFormErrorHandler;
