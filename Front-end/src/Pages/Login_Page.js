import '../css/App.css';
import email from '../Poze/email.png';
import pass from '../Poze/reset-password.png';
import { Button } from 'react-native-web';

const Login_Page = () => {
  return (
    <div className="App">
      <div className="left-component">
        <a>Bine ai venit!</a>
        <a>Aveti doar o posibilitate de a alege disciplina complementară. Aceasta nu poate fi modificată după, alegeți cu precauție și citiți fișa disciplinei.</a>
        <a>După procesul de selecție și distribuire, veți primi un mail, cu confirmarea alegerii și orarul.</a>
      </div>

      <div className="right-component">
        <a>Login</a>

        <div class="input-container">
          <img src={email} class="input-image" alt="Image Description"/>
          <input type="text" class="input-field" id="Email" placeholder="Email"/>
        </div>

        <div class="input-container">
          <img src={pass} class="input-image" alt="Image Description"/>
          <input type="text" class="input-field" id= "Password" placeholder="Password"/>
        </div>

        <button className="button">Login</button>
      </div>
    </div>
  );
}

export default Login_Page;
