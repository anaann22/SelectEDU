import React, { useState, useEffect } from 'react';
import Card from '../Components/Card.js';


const CardsPage = () => {
  const [cards, setCards] = useState([]);

  const fetchAllImageInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/all-image-info');
      const allImageInfo = await response.json();

      const imageDataArray = allImageInfo.map((imageInfo) => {
        return {
          id: imageInfo.id,
          imageUrl: imageInfo.Poza_Materie, 
          title: imageInfo.Nume_Materie,
          faculty: imageInfo.Faculty,
          cod: imageInfo.Cod_Materie,
          nume: imageInfo.Profesor_Nume,
          prenume: imageInfo.Profesor_Prenume
        };
      });

      setCards(imageDataArray);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchAllImageInfo();
  }, []);

  return (
    <>
    <div className='page-size-first-row'>
      <div className="card-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              faculty={card.faculty}
              nume={card.nume}
              prenume={card.prenume}
              cod={card.cod}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardsPage;
