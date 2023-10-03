import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../modules/Login/Login';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Dashboard from '../modules/Dashboard/Dashboard';
import InsertarExpediente from '../modules/Expediente/InsertarExpediente';
import Error from '../modules/Error/Error';
import ExpedienteTable from '../modules/Expediente/Expedientes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



function MyRoutes() {
  return (
  <LocalizationProvider dateAdapter={AdapterDayjs }>
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={<PageTemplate/>}>
          <Route exact path="" element={<Dashboard/>} />
          <Route exact path="/dashboard/expedientes" element={<ExpedienteTable/>} />
          <Route exact path="/dashboard/insertar" element={<InsertarExpediente/>} />
        </Route>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  </LocalizationProvider>
  );
}

export default MyRoutes;
