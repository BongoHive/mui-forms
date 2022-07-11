import { DatePicker, DatePickerProps } from '@mui/lab';

import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import moment from 'moment';
import DateFnsProvider from './DateFnsProvider';
import React from 'react';

export type DatePickerYearElementProps = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'renderInput'
> & {
  name: string;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  validation?: ControllerProps['rules'];
  // eslint-disable-next-line no-unused-vars
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
};

/**
 * Dealing with dates is a bit tricky.(usefully links)
 *  Matches years between 1950 and 2050
 */
export const yearRegex = /^(19[5-9]\d|20[0-4]\d|2050)$/;

/**
 *
 * Dealing with dates is a bit tricky.(usefully links)
 */
export const yearFormatString = 'YYYY';

/**
 *  Year only date picker
 *  Accepts a year in the format YYYY with a max of 4 digits
 *  Range: 1950-2050
 * @param param0
 * @returns
 */
export default function DatePickerYearElement({
  name,
  required,
  validation = {},
  inputProps,
  ...rest
}: DatePickerYearElementProps) {
  const { control } = useFormContext();

  if (required) {
    validation.required = 'This field is required';
  }
  validation.pattern = { value: yearRegex, message: 'Invalid year input' };

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
            views={['year']}
            value={value}
            onChange={(date, selectionState) => {
              let parseDate = '';
              if (selectionState) {
                // selectionState user input date
                parseDate = selectionState;
              } else {
                // date picker state
                parseDate = moment(date).format(yearFormatString);
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
