/// <reference types="vite/client" />
export interface TableContextValue {
	data: TableData[];
	loading: boolean;
	error: string | null;
	setError: string | null;
	addRecord: (record: Partial<TableData>) => Promise<void>;
	updateRecord: (id: string, record: Partial<TableData>) => Promise<void>;
	deleteRecord: (id: string) => Promise<void>;
  }