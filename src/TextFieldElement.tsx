import { TextField, TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError
} from 'react-hook-form';

export type TextFieldElementProps = Omit<TextFieldProps, 'name'> & {
  validation?: ControllerProps['rules'];
  name: string;
  // eslint-disable-next-line no-unused-vars
  parseError?: (error: FieldError) => string;
  control?: Control<any>;
};

export default function TextFieldElement({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  ...rest
}: TextFieldElementProps) {
  if (required && validation?.required === undefined) {
    validation.required = 'This field is required';
  }
  if (typeof validation?.required === 'boolean') {
    validation.required = 'This field is required';
  }
  if (type === 'email') {
    validation.pattern = {
      // eslint-disable-next-line no-useless-escape
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address'
    };
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
      }) => (
        <TextField
          {...rest}
          inputRef={ref}
          name={name}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={invalid}
          helperText={
            // eslint-disable-next-line no-nested-ternary
            error
              ? typeof parseError === 'function'
                ? parseError(error)
                : error.message
              : rest.helperText
          }
        />
      )}
    />
  );
}
