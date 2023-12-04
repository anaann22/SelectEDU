import React, { useState, useEffect } from 'react';
import Side from '../Components/Admin/Side_bar.js';
import CardsPage from '../Components/Admin/CardsPage.js';


const Admin_Page = () => {

  return (
    <>
      <Side />
      <CardsPage />
    </>
  );
};

export default Admin_Page;
