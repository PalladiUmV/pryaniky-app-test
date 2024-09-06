import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TablePage from './pages/TablePage';  
import { TableProvider } from './contexts/TableContext';


const App: React.FC = () => {
  return (
     // <Router basename={process.env.PUBLIC_URL} >
     <Router>
     <TableProvider>
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/table" element={<TablePage />} />
         <Route path="*" element={<Login />} /> 
       </Routes>
     </TableProvider>
   </Router>
  );
};

export default App;
