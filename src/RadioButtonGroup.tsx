import { ChangeEvent } from 'react';
import { Control, FieldError, useController } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';

export interface Options {
  label: string;
  value: string;
}

export type RadioButtonGroupProps = {
  options: any[];
  helperText?: string;
  name: string;
  required?: boolean;

  // eslint-disable-next-line no-unused-vars
  parseError?: (error: FieldError) => string;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  type?: 'number' | 'string';
  emptyOptionLabel?: 'string';
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: any) => void;
  returnObject?: boolean;
  row?: boolean;
  control?: Control<any>;
};

export default function RadioButtonGroup({
  helperText,
  options,
  label,
  name,
  parseError,
  labelKey = 'label',
  valueKey = 'id',
  required,
  emptyOptionLabel,
  returnObject,
  row,
  control,
  ...rest
}: RadioButtonGroupProps) {
  const theme = useTheme();
  const {
    field: { value, onChange },
    fieldState: { invalid, error }
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : undefined,
    control
  });

  // eslint-disable-next-line no-nested-ternary
  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText;

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value;
    const returnValue = returnObject
      ? options.find((items) => items[valueKey] === radioValue)
      : radioValue;
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue);
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue);
    }
  };

  return (
    <FormControl error={invalid}>
      {label && (
        <FormLabel required={required} error={invalid}>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        onChange={onRadioChange}
        name={name}
        row={row}
        value={value || ''}
      >
        {emptyOptionLabel && (
          <FormControlLabel
            control={
              <Radio
                sx={{
                  color: invalid ? theme.palette.error.main : undefined
                }}
                checked={!value}
              />
            }
            label={emptyOptionLabel}
            value=""
          />
        )}
        {options.map((option: any) => {
          const optionKey = option[valueKey];
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option
            );
          }
          const isChecked = !!(
            value &&
            (returnObject ? value[valueKey] === optionKey : value === optionKey)
          );
          return (
            <FormControlLabel
              control={
                <Radio
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined
                  }}
                  checked={isChecked}
                />
              }
              value={optionKey}
              label={option[labelKey]}
              key={optionKey}
            />
          );
        })}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
