import React, { useState } from 'react';
import { Container } from '@mui/material';
import TableView from '../components/TableView';
import RecordForm from '../components/RecordForm';
import ErrorSnackbar from '../components/ErrorSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import useTableData from '../hooks/useTableData';
import { TableData } from '../contexts/TableContext';

const TablePage: React.FC = () => {
  const { data, loading, error, setError, addRecord, updateRecord, deleteRecord } = useTableData();
  const [newRecord, setNewRecord] = useState<Partial<TableData>>({});
  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleAddRecord = async () => {
    await addRecord(newRecord);
    setNewRecord({});
  };

  const handleEditRecord = async () => {
    if (!editRecordId) return;
    await updateRecord(editRecordId, newRecord);
    setNewRecord({});
    setEditRecordId(null);
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteRecord(id);
  };

  const startEditing = (record: TableData) => {
    setEditRecordId(record.id);
    setNewRecord(record);
  };

  return (
    <Container>
      <RecordForm
        record={newRecord}
        onChange={handleInputChange}
        onSubmit={editRecordId ? handleEditRecord : handleAddRecord}
        isLoading={loading}
      />
      <TableView data={data} onEdit={startEditing} onDelete={handleDeleteRecord} isLoading={loading} />
      <ErrorSnackbar message={error} onClose={() => setError(null)} />
      <LoadingOverlay isLoading={loading} />
    </Container>
  );
};

export default TablePage;