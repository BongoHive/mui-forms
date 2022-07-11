import CloseIcon from '@mui/icons-material/Cancel';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material';

export type MultiSelectElementProps = Omit<SelectProps, 'value'> & {
  menuItems: any[];
  label?: string;
  itemKey?: string;
  itemValue?: string;
  itemLabel?: string;
  required?: boolean;
  validation?: any;
  name: string;

  // eslint-disable-next-line no-unused-vars
  parseError?: (error: FieldError) => string;
  minWidth?: number;
  menuMaxHeight?: number;
  menuMaxWidth?: number;
  helperText?: string;
  showChips?: boolean;
  control?: Control<any>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function MultiSelectElement({
  menuItems,
  label = '',
  itemKey = '',
  itemValue = '',
  itemLabel = '',
  required = false,
  validation = {},
  parseError,
  name,
  menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  menuMaxWidth = 250,
  minWidth = 120,
  helperText,
  showChips,
  variant,
  control,
  ...rest
}: MultiSelectElementProps) {
  if (required) {
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error }
      }) => {
        // eslint-disable-next-line no-nested-ternary
        helperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText;
        return (
          <FormControl
            variant={variant}
            style={{ minWidth }}
            fullWidth={rest.fullWidth}
            error={invalid}
          >
            {label && (
              <InputLabel
                error={invalid}
                htmlFor={rest.id || `select-multi-select-${name}`}
                required={required}
              >
                {label}
              </InputLabel>
            )}
            <Select
              {...rest}
              id={rest.id || `select-multi-select-${name}`}
              multiple
              label={label || undefined}
              error={invalid}
              value={value || []}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: menuMaxHeight,
                    width: menuMaxWidth
                  }
                }
              }}
              renderValue={
                showChips
                  ? (selected) => (
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {((selected as any[]) || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                            onDelete={() => {
                              onChange(
                                value.filter((i: any) => i !== selectedValue)
                              );
                              // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
                            }}
                            deleteIcon={
                              <CloseIcon
                                onMouseDown={(ev) => {
                                  ev.stopPropagation();
                                }}
                              />
                            }
                          />
                        ))}
                      </div>
                    )
                  : undefined
              }
            >
              {menuItems.map((item: any) => (
                <MenuItem
                  key={itemKey ? item[itemKey] : item}
                  value={itemValue ? item[itemValue] : item}
                  style={{
                    fontWeight: (value || []).includes(item) ? 'bold' : 'normal'
                  }}
                >
                  {itemLabel ? item[itemLabel] : item}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
