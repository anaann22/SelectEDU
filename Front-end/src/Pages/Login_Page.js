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
  const [buttonShake, setButtonShake] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();

  setErrors({
    email: '',
    password: '',
  });

  const emailRegex = /^[^\s@]+@e-uvt\.ro$/;
  if (!email.trim() || !emailRegex.test(email)) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !email.trim() ? 'Introduceți adresa de email.' : 'Adresa de email nu este validă.',
    }));
  }

  if (!password.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: 'Introduceți parola.',
    }));
  }

  if (Object.values(errors).some((error) => error !== '')) {
    setButtonShake(true);
    setTimeout(() => {
      setButtonShake(false);
    }, 500);

    return;
  }

  
  
    console.log(email, password);
  
    try {
      console.log('Attempting user login...');
      const userResponse = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
  
      console.log('User Response:', userResponse.data);
  
      if (userResponse && userResponse.data && userResponse.data.token) {
        const { token } = userResponse.data;
        localStorage.setItem('token', token);
  
        setSuccessMessage('Login successful');
        setSnackbarOpen(true);
  
        navigate('/Choice');
        return;
      }
  
      setErrors({
        email: '',
        password: 'Emailul sau parola sunt incorecte. Incercati inca o data.',
      });

      setSnackbarOpen(true);
    } catch (error) {
      console.error('Login Error:', error);
  
      setErrorMessage(error.response ? error.response.data.message : errorMessage || 'Login failed');
      setSnackbarOpen(true);
    }
  
    try {
      console.log('Attempting Logare ...');
      const adminResponse = await axios.post('http://localhost:8080/auth/admin-login', {
        email,
        password,
      });
  
      console.log('Admin Response:', adminResponse.data);
  
      if (adminResponse && adminResponse.data && adminResponse.data.token) {
        const { token } = adminResponse.data;
        localStorage.setItem('token', token);
  
        setSuccessMessage('Logare  successful');
        setSnackbarOpen(true);
  
        navigate('/Admin');
        return;
      }

      setErrorMessage('Logare  failed');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Eroare', error);
  
      setErrorMessage(error.response ? error.response.data.message : error.message || 'Logare  failed');
      setSnackbarOpen(true);
    }
  };
  
  
  
  
  return (
    <div className="App">
      <div className="left-component">
        <a>Bine ai venit!</a>
        <a>Alegerea complementarei se realizează prin intermediul contului de uvt!</a>
        <a>Aveti doar o posibilitate de a alege disciplina complementară. Aceasta nu poate fi modificată după, alegeți cu precauție!</a>

      </div>

      <div className="right-component">
        <a>Login</a>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <img src={email_poza} className="input-image" alt="Image Description" />
            <input
              type="text"
              className="input-field"
              id="Email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="input-container">
            <img src={pass} className="input-image" alt="Image Description" />
            <input
              type="password"
              className="input-field"
              id="Password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button className={`button ${buttonShake ? 'shake' : ''}`} type="submit">
          Login
          </button>


        </form>
          {errorMessage && <div className="error">{errorMessage}</div>}

      </div>
    </div>
  );
}

export default Login_Page;