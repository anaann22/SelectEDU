import './css/Login.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login_Page.js';
import Choice from './Pages/Choice_Page.js';
import Admin from './Pages/Admin_Page.js';
import User from './Pages/User_Page.js';
import UserChoice from './Pages/User_Choice.js';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Choice" element={<Choice />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/User" element={<User />} />
        <Route path="/UserChoice" element={<UserChoice />} />
      </Routes>
      </Router>
  );
}

export default App;
