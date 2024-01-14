import React, { useState, useEffect } from 'react';
import Side from '../Components/User/Side_bar_user.js';
import CardsChoice from '../Components/User/CardsChoice.js';
import '../css/readDoc.css'; 
import { useNavigate } from 'react-router-dom';

const User_Choice = () => {
  const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/Confirm');
    };

  return (
    <>
      <Side />
      <CardsChoice />

      <div className="button-card2" onClick={handleNextPage}>
             <button>Urmatoarea pagina</button>
</div>
    </>
  );
};

export default User_Choice;
