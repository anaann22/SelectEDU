import './css/Login.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login_Page.js';
import Confirm from './Pages/Confirm.js';
import Choice from './Pages/Choice_Page.js';
import Admin from './Pages/Admin_Page.js';
import User from './Pages/User_Page.js';
import UserChoice from './Pages/User_Choice.js';
import ReadDocumentation from './Pages/ReadDocumentation.js';
import Choice_Page from './Pages/Choice_Page.js';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Choice" element={<Choice />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/User" element={<User />} />
        <Route path="/UserChoice" element={<UserChoice />} />
        <Route path="/ReadDocumentation" element={<ReadDocumentation/>}/>
        <Route path="/Confirm" element={<Confirm/>}/>
        <Route path="/ChoicePage" element={<Choice_Page/>}/>
      </Routes>
      </Router>
  );
}

export default App;
