import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

type MuiCustomAutoCompleteProps = {
  control: any;
  name: string;
  size: 'small' | 'medium' | undefined;
  options: any[];
  labelOption: string;
  defaultValue: Record<string, any>;
  label: string;
};

const MuiCustomAutoComplete = ({
  control,
  name,
  defaultValue,
  options,
  label,
  size,
  labelOption
}: MuiCustomAutoCompleteProps) => {
  return (
    <Controller
      render={({ field: { onChange }, ...props }) => (
        <Autocomplete
          size={size}
          options={options}
          getOptionLabel={(option: any) => option[labelOption]}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label={label}
              variant="outlined"
            />
          )}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      // @ts-ignore
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
};

export default MuiCustomAutoComplete;
