import React from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';

interface ErrorSnackbarProps extends Omit<AlertProps, 'children'> {
  message: string;
  onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ message, onClose, ...props }) => {
  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" {...props}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;