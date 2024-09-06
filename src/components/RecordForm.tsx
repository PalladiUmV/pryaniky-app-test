import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { TableData } from '../contexts/TableContext';

interface RecordFormProps {
  record: Partial<TableData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const RecordForm: React.FC<RecordFormProps> = ({ record, onChange, onSubmit, isLoading }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Company Signature Date"
        name="companySigDate"
        value={record.companySigDate || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Company Signature Name"
        name="companySignatureName"
        value={record.companySignatureName || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Name"
        name="documentName"
        value={record.documentName || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Status"
        name="documentStatus"
        value={record.documentStatus || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Type"
        name="documentType"
        value={record.documentType || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Employee Number"
        name="employeeNumber"
        value={record.employeeNumber || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Employee Signature Date"
        name="employeeSigDate"
        value={record.employeeSigDate || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Employee Signature Name"
        name="employeeSignatureName"
        value={record.employeeSignatureName || ''}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      {record.id ? (
        <Button variant="contained" color="primary" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Add Record'}
        </Button>
      )}
    </Box>
  );
};

export default RecordForm;