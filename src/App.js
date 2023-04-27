
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Protected from './components/Protected';


function App() {

  const {currentUser} = useContext(AuthContext);
  
  

  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        
        <Route exact path='/' element={ <Protected currentUser={currentUser} > <Home /> </Protected>}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
      </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
