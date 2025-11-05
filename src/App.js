import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Components/Table';

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Table/>} ></Route> 
        <Route path='/form/:id?' element={<Form/>}></Route>
     </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
