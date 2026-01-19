import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
   <div>
     <ToastContainer position="top-right" autoClose={3000} />
    <AllRoutes/>
     
   </div>
  );
}

export default App;
