import React, { useState, useEffect } from 'react';
import Card from '../Admin/Card_Admin.js';
import Search_Bar from '../Search_Bar.js'; 
import Card_User_Choice from './Card_User_Choice.js';

const CardsChoice = () => {
  const [cards, setCards] = useState([]);
  const [filteredMaterie, setFilteredMaterie] = useState([]);

  const fetchAllImageInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/all-image-info');
      const allImageInfo = await response.json();

      const imageDataArray = allImageInfo.map((imageInfo) => ({
        id: imageInfo.id,
        imageUrl: imageInfo.Poza_Materie,
        title: imageInfo.Nume_Materie,
        faculty: imageInfo.Faculty,
        cod: imageInfo.Cod_Materie,
        nume: imageInfo.Profesor_Nume,
        prenume: imageInfo.Profesor_Prenume,
        semestru: imageInfo.Semestru,
      
      }));

      setCards(imageDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredData = cards.filter((materie) => {
      const lowercasedName = materie.title.toLowerCase();
      const codIncludesTerm =
        typeof materie.cod === 'number' && materie.cod.toString().includes(lowercasedSearchTerm);
  
      return lowercasedName.includes(lowercasedSearchTerm) || codIncludesTerm;
    });
  
    setFilteredMaterie(filteredData);
  };
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAllImageInfo();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchAllImageInfo();
  }, []);

  return (
    <>
      <div className='page-size-first-row'>
        <Search_Bar onSearch={handleSearch} />
        <div className="card-container">
          {filteredMaterie.length > 0
            ? filteredMaterie.map((card) => (
                <Card_User_Choice
                  key={card.id}
                  imageUrl={card.imageUrl}
                  title={card.title}
                  faculty={card.faculty}
                  nume={card.nume}
                  prenume={card.prenume}
                  cod={card.cod}
                  semestru={card.semestru}
                />
              ))
            : cards.map((card) => (
                <Card_User_Choice
                  key={card.id}
                  imageUrl={card.imageUrl}
                  title={card.title}
                  faculty={card.faculty}
                  nume={card.nume}
                  prenume={card.prenume}
                  cod={card.cod}
                  semestru={card.semestru}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default CardsChoice;
