import React, { useState, useEffect } from 'react';
import Side from '../Components/User/Side_bar_user.js';
import CardsChoice from '../Components/User/CardsChoice.js';
import '../css/readDoc.css'; 
import '../css/confirm.css'; 
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/ChoicePage');
  };

  return (
    <>
      <div className="card">
        <h1>Felicitări Nume Prenume !</h1>
        <p>
          Ai ajuns la finalul procesului de selecție
          </p>
          <p>
          Aici găsești complementarele pe care le vei parcurge în acest an de studiu.
          </p>
        
          <p>
          Semestrul I .....
          </p>
          <p>
          Semestrul II ....
          </p>

      </div>
      <div className="button-card2" onClick={handleNextPage}>
        <button>Ecran principal</button>
      </div>
    </>
  );
};

export default Confirm;
