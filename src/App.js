//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tareas from './pages/Tareas';
import NuevaTarea from './pages/NuevaTarea';
import ActualizarTarea from './pages/ActualizarTarea';

function App() {
  const[tareas,setTareas] = useState(null)
  return (
    <div className="App">
      <header className="App-header">
      <Router>
          <Routes>
          <Route path='/' element={<Tareas tareas={tareas} sett={setTareas} />} />
          <Route path='/nueva' element={<NuevaTarea/>} />
          <Route path='/actualizar/:id' element={<ActualizarTarea/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
