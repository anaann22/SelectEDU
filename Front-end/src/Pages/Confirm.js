import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/confirm.css'; 

const Confirm = () => {
  const location = useLocation();
  const selectedMaterii = location.state?.selectedMaterii || [];

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Choice');
  };

  return (
    <div className="container-confirm">
      <div className="page">
        <h1>Confirmare materii complementare alese:</h1>
          {selectedMaterii.map((materie, index) => (
            <p key={index}>{`Semestrul: ${materie.semestru}, Materie: ${materie.title}, Cod: ${materie.cod}`}</p>
          ))}
          <button className='buton-confirm'onClick={handleButtonClick}>Confirm selectia</button>
      </div>
    </div>
  );
};

export default Confirm;
