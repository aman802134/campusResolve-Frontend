export type ValidationErrorItem = { field: string; message: string };
export type ValidationErrorResponse = {
  errors: ValidationErrorItem[];
  message?: string;
};
