import { useContext } from 'react';
import { TableContext, TableContextValue } from '../contexts/TableContext';

const useTableData = (): TableContextValue => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableProvider');
  }
  return context;
};

export default useTableData;