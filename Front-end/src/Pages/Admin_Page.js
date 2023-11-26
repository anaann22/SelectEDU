import React, { useState, useEffect } from 'react';
import '../css/Admin.css';
import Side from '../Components/Side_bar.js';
import CardsPage from '../Components/CardsPage.js';


const Admin_Page = () => {

  return (
    <>
      <Side />
      <CardsPage />
    </>
  );
};

export default Admin_Page;
