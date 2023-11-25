import '../css/App.css';
import email_poza from '../Poze/email.png';
import pass from '../Poze/reset-password.png';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login_Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  
    try {
      // Try to log in as a user
      console.log('Attempting user login...');
      const userResponse = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
  
      console.log('User Response:', userResponse.data);
  
      if (userResponse && userResponse.data) {
        const { token } = userResponse.data;
        localStorage.setItem("token", token);
  
        setSuccessMessage("Login successful");
        setSnackbarOpen(true);
  
        // Redirect to the user dashboard
        navigate('/Choice');
        return;
      }
  
      // If logging in as a user fails, try logging in as an admin
      console.log('Attempting admin login...');
      const adminResponse = await axios.post('http://localhost:8080/auth/admin-login', {
        email,
        password,
      });
  
      console.log('Admin Response:', adminResponse.data);
  
      if (adminResponse && adminResponse.data) {
        const { token } = adminResponse.data;
        localStorage.setItem("token", token);
  
        setSuccessMessage("Login successful");
        setSnackbarOpen(true);
  
        // Redirect to the admin dashboard
        navigate('/Admin');
        return;
      }
  
      // If both login attempts fail
      setErrorMessage("Login failed");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Login Error:", error);
  
      setErrorMessage(error.response ? error.response.data.message : error.message);
      setSnackbarOpen(true);
    }
  };
  
  
  
  return (
    <div className="App">
      <div className="left-component">
        <a>Bine ai venit!</a>
        <a>Aveti doar o posibilitate de a alege disciplina complementară. Aceasta nu poate fi modificată după, alegeți cu precauție și citiți fișa disciplinei.</a>
        <a>După procesul de selecție și distribuire, veți primi un mail, cu confirmarea alegerii și orarul.</a>
      </div>

      <div className="right-component">
        <a>Login</a>
      <form onSubmit={handleSubmit}>
        <div class="input-container">
          <img src={email_poza} class="input-image" alt="Image Description"/>
          <input 
          type="text" 
          class="input-field" 
          id="Email" 
          value={email} 
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div class="input-container">
          <img src={pass} class="input-image" alt="Image Description"/>
          <input 
          type="password" 
          class="input-field" 
          id= "Password" 
          value={password} 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button className="button" onSubmit={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login_Page;
