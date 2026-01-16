import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-bootstrap';


function App() {
  return (
   <div>
     <ToastContainer position="top-right" autoClose={3000} />
    <AllRoutes/>
     
   </div>
  );
}

export default App;
