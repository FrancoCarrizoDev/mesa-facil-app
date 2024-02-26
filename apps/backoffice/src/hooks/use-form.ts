import { type FormEvent, useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema?: (values: T) => {
    [key in keyof T]?: string;
  };
}

export default function useForm<T>({
  initialValues,
  onSubmit,
  validationSchema,
}: UseFormProps<T>): {
  values: T;
  setErrors: (errors: { [key in keyof T]?: string }) => void;
  handleChange: (newValues: {
    [key in keyof T]?: T[key];
  }) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors: { [key in keyof T]?: string };
  handleReset: () => void;
} {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});

  const handleChange = (newValues: {
    [key in keyof T]?: T[key];
  }): void => {
    setValues({
      ...values,
      ...newValues,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors = validationSchema ? validationSchema(values) : {};
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (!noErrors) {
      return;
    }
    onSubmit(values);
  };

  const handleReset = (): void => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    handleReset,
  };
}
