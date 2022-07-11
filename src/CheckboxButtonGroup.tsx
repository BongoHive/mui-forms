import React from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material';
import { Control, FieldError, useController } from 'react-hook-form';

export type CheckboxButtonGroupProps = {
  options: any[];
  helperText?: string;
  name: string;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  parseError?: (error: FieldError) => string;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  onChange?: Function;
  returnObject?: boolean;
  disabled?: boolean;
  row?: boolean;
  control?: Control<any>;
  checkboxColor?: CheckboxProps['color'];
};

export default function CheckboxButtonGroup({
  helperText,
  options,
  label,
  name,
  parseError,
  required,
  labelKey = 'label',
  valueKey = 'id',
  returnObject,
  disabled,
  row,
  control,
  checkboxColor,
  ...rest
}: CheckboxButtonGroupProps) {
  const theme = useTheme();
  const {
    field: { value = [], onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : undefined,
    control,
  });

  // eslint-disable-next-line no-nested-ternary
  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText;

  const handleChange = (index: number | string) => {
    const newArray = [...value];
    const exists =
      value.findIndex((i: any) =>
        returnObject ? i[valueKey] === index : i === index
      ) === -1;
    if (exists) {
      newArray.push(
        returnObject ? options.find((i) => i[valueKey] === index) : index
      );
    } else {
      newArray.splice(
        value.findIndex((i: any) =>
          returnObject ? i[valueKey] === index : i === index
        ),
        1
      );
    }
    // setValue(name, newArray, { shouldValidate: true })
    onChange(newArray);
    if (typeof rest.onChange === 'function') {
      rest.onChange(newArray);
    }
  };

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const optionKey = option[valueKey];
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option
            );
          }
          const isChecked =
            value.findIndex((item: any) =>
              returnObject ? item[valueKey] === optionKey : item === optionKey
            ) !== -1;
          return (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(optionKey)}
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          );
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
