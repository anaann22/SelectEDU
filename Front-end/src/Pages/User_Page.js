import React, { useState, useEffect } from 'react';
import Side from '../Components/User/Side_bar_user.js';
import CardsPage from '../Components/User/CardsPage_User.js';
import '../css/readDoc.css'; 
import { useNavigate } from 'react-router-dom';


const User_Page = () => {
  const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/UserChoice');
    };

  return (
    <>
      <Side />
      <CardsPage />

      <div className="button-card2" onClick={handleNextPage}>
             <button>Urmatoarea pagina</button>
</div>
    </>
  );
};

export default User_Page;
