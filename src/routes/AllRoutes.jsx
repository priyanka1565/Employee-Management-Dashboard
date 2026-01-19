import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';


const AllRoutes=()=> {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
    </Routes>
  );
}
export default AllRoutes;
