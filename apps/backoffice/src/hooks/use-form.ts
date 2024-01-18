import { type FormEvent, useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export default function useForm<T>({
  initialValues,
  onSubmit,
}: UseFormProps<T>): {
  values: T;
  handleChange: (newValues: {
    [key in keyof T]?: T[key];
  }) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
} {
  const [values, setValues] = useState<T>(initialValues);

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
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
