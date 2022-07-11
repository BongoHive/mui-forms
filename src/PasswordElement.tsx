import React, { MouseEvent, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextFieldElement, { TextFieldElementProps } from './TextFieldElement';

export type PasswordElementProps = TextFieldElementProps;

export default function PasswordElement(props: PasswordElementProps) {
  const [password, setPassword] = useState<boolean>(true);
  return (
    <TextFieldElement
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
              onClick={() => setPassword(!password)}
              tabIndex={-1}
              size="large"
            >
              {password ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={password ? 'password' : 'text'}
    />
  );
}
