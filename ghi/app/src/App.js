import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './ListAppointments'
import TechnicianForm from './TechnicianForm'
import ServiceHistory from './ServiceHistory'
import SalesmanForm from './SalesmanForm'
import CustmerForm from './CustomerForm'
import NewSale from './NewSale'
import ListSales from './ListSales'
import ListManufacturers from './ListManufacturer';
import ListModels from './ListModels';
import ListInventory from './ListInventory';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
        <div className="">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/appointments/" element={<AppointmentsList />} />
            <Route path="technicians/new" element={<TechnicianForm />} />
            <Route path="appointments/history" element={<ServiceHistory />} />
            <Route path="/sales/newsalesman" element={<SalesmanForm />} />
            <Route path="/sales/customer" element={<CustmerForm />} />
            <Route path="/sales/newsale" element={<NewSale />} />
            <Route path="/sales/listsales" element={<ListSales />} />
            <Route path="manufacturers" element={<ListManufacturers />} />
            <Route path="models" element={<ListModels />} />
            <Route path="inventory" element={<ListInventory />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
