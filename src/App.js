import './css/Login.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login_Page.js';
import Choice from './Pages/Choice_Page.js';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Choice" element={<Choice />} />
      </Routes>
      </Router>
  );
}

export default App;
