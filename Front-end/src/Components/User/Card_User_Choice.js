import React, { useEffect, useState } from 'react';
import '../../css/Card.css';
import axios from 'axios';

const Card_User_Choice = ({ imageUrl, title, faculty, nume, prenume, cod, semestru }) => {
  const [imageData, setImageData] = useState('');
  

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setImageData(dataUrl);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, [imageUrl]);


  const handleChoice = async () => {
    try {
      await axios.post(`http://localhost:8080/api/alegere-materie/${cod}`);
    } catch (error) {
      console.error('Error choosing the subject:', error);
    }
  };
  

  return (
    <div className="card">
      <img src={imageData} alt={title} className="card-image" />

      <div className="card-content">
        <h3 className="card-title">{cod}: {title}</h3>
        <p className="card-faculty">{faculty}</p>
        <p className="card-sem">Semestru : {semestru}</p>
        <p className="card-name">Profesor: {nume} {prenume}</p> 
        <div className="card-buttons">
          <button className="button-card" onClick={handleChoice}>Alege materia</button>
        </div>
      </div>
    </div>
  );
};

export default Card_User_Choice;
