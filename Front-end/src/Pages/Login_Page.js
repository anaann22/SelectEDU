import '../css/App.css';
import email_poza from '../Poze/email.png';
import pass from '../Poze/reset-password.png';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Form } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      if (response && response.data) {
        const { token, ...user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setSuccessMessage("Login successful");
        setSnackbarOpen(true);

        navigate('/Choice');
      } else {
        setErrorMessage("Response or response data is undefined");
        setSnackbarOpen(true);
      }
    } catch (error) {
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
