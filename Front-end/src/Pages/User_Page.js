import React, { useState, useEffect } from 'react';
import Side from '../Components/User/Side_bar_user.js';
import CardsPage from '../Components/User/CardsPage_User.js';


const User_Page = () => {

  return (
    <>
      <Side />
      <CardsPage />
    </>
  );
};

export default User_Page;
