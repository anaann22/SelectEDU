import React, { useState, useEffect } from 'react';
import Side from '../Components/User/Side_bar_user.js';
import CardsChoice from '../Components/User/CardsChoice.js';
import '../css/readDoc.css'; 
import { useNavigate } from 'react-router-dom';

const User_Choice = () => {

  return (
    <>
      <Side />
      <CardsChoice />

    </>
  );
};

export default User_Choice;
