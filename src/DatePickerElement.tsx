import { DatePicker, DatePickerProps } from '@mui/lab';

import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import moment from 'moment';
import DateFnsProvider from './DateFnsProvider';
import React from 'react';

export type DatePickerElementProps = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'renderInput'
> & {
  name: string;
  required?: boolean;

  validation?: ControllerProps['rules'];

  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
};

/**
 * Matches  date in the format MM/DD/YYYY
 */
export const dateRegex =
  /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;

export const dateFormatString = 'MM/DD/YYYY';

export default function DatePickerElement({
  name,
  required,
  validation = {},
  inputProps,
  ...rest
}: DatePickerElementProps) {
  const { control } = useFormContext();

  if (required) {
    validation.required = 'This field is required';
  }
  validation.pattern = { value: dateRegex, message: 'Invalid date format' };
  // validation.max = { value: 10, message: 'Date must be in the past' };
  validation.minLength = { value: 10, message: 'Invalid date format' };

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => (
        <DateFnsProvider>
          <DatePicker
            {...rest}
            value={value}
            minDate={new Date('01/01/2000')}
            // maxDate={new Date()}
            onChange={(date, selectionState) => {
              let parseDate = '';
              if (selectionState) {
                parseDate = selectionState;
              } else {
                parseDate = moment(date).format(dateFormatString);
              }
              onChange(parseDate);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...inputProps}
                error={invalid}
                fullWidth
                size="small"
                helperText={error?.message}
              />
            )}
          />
        </DateFnsProvider>
      )}
    />
  );
}
