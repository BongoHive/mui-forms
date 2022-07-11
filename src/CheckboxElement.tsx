import {
  Control,
  Controller,
  ControllerProps,
  FieldError
} from 'react-hook-form';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText
} from '@mui/material';

export type CheckboxElementProps = Omit<CheckboxProps, 'name'> & {
  validation?: ControllerProps['rules'];
  name: string;
  // eslint-disable-next-line no-unused-vars
  parseError?: (error: FieldError) => string;
  label?: FormControlLabelProps['label'];
  helperText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export default function CheckboxElement({
  name,
  validation = {},
  required,
  parseError,
  label,
  control,
  ...rest
}: CheckboxElementProps) {
  if (required) {
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { invalid, error }
      }) => {
        // eslint-disable-next-line no-nested-ternary
        const helperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : rest.helperText;
        return (
          <FormControl required={required} error={invalid}>
            <FormGroup row>
              <FormControlLabel
                label={label || ''}
                control={
                  <Checkbox
                    color="primary"
                    sx={{
                      color: invalid ? 'error.main' : undefined
                    }}
                    value={value}
                    checked={!!value}
                    onChange={() => {
                      onChange(!value);
                      // setValue(name, !formValue, { shouldValidate: true })
                    }}
                  />
                }
              />
            </FormGroup>
            {helperText && (
              <FormHelperText error={invalid}>{helperText}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
