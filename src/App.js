
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Protected from './components/Protected';


function App() {

  const {currentUser} = useContext(AuthContext);

  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  

  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        
        <Route exact path='/' element={ <Protected currentUser={currentUser} > <Home sidebarToggle= {sidebarToggle} setSidebarToggle = {setSidebarToggle} /> </Protected>}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
      </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
