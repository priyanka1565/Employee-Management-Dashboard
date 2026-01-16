import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';


const AllRoutes=()=> {
  return (
    <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default AllRoutes;
