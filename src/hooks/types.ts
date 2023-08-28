import * as Yup from "yup";

export interface FormFields {
  [key: string]: any | undefined;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormOptions {
  initialValues: FormFields;
  validationSchema?: Yup.Schema<FormFields>;
  onSubmit: (values: FormFields) => void;
}
