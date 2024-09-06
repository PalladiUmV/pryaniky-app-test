import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { TableData } from '../contexts/TableContext';

interface TableViewProps {
  data: TableData[];
  onEdit: (record: TableData) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const TableView: React.FC<TableViewProps> = ({ data, onEdit, onDelete, isLoading }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Company Signature Date</TableCell>
          <TableCell>Company Signature Name</TableCell>
          <TableCell>Document Name</TableCell>
          <TableCell>Document Status</TableCell>
          <TableCell>Document Type</TableCell>
          <TableCell>Employee Number</TableCell>
          <TableCell>Employee Signature Date</TableCell>
          <TableCell>Employee Signature Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.companySigDate}</TableCell>
            <TableCell>{row.companySignatureName}</TableCell>
            <TableCell>{row.documentName}</TableCell>
            <TableCell>{row.documentStatus}</TableCell>
            <TableCell>{row.documentType}</TableCell>
            <TableCell>{row.employeeNumber}</TableCell>
            <TableCell>{row.employeeSigDate}</TableCell>
            <TableCell>{row.employeeSignatureName}</TableCell>
            <TableCell>
              <Button variant="contained" color="secondary" onClick={() => onEdit(row)} disabled={isLoading}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => onDelete(row.id)} disabled={isLoading}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;