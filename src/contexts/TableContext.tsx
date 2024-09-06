import React, { createContext, useState, useEffect } from 'react';

export interface TableData {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

interface MyComponentProps extends React.PropsWithChildren<{}> {
}

export interface TableContextValue {
  data: TableData[];
  loading: boolean;
  error: string | null;
  setError: string | null;
  addRecord: (record: Partial<TableData>) => Promise<void>;
  updateRecord: (id: string, record: Partial<TableData>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

export const TableContext = createContext<TableContextValue | null>(null);

export const TableProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          setError('Ошибка при загрузке данных');
        }
      } catch (err) {
        setError('Ошибка соединения с сервером');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addRecord = async (record: Partial<TableData>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const result = await response.json();
        setData([...data, result.data]);
      } else {
        setError('Ошибка при добавлении записи');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    }
  };

  const updateRecord = async (id: string, record: Partial<TableData>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const result = await response.json();
        setData(data.map((item) => (item.id === id ? result.data : item)));
      } else {
        setError('Ошибка при изменении записи');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
      });

      if (response.ok) {
        setData(data.filter((item) => item.id !== id));
      } else {
        setError('Ошибка при удалении записи');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <TableContext.Provider value={{ data, loading, error, setError, addRecord, updateRecord, deleteRecord }}>
      {children}
    </TableContext.Provider>
  );
};