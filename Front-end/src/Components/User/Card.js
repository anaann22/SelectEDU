import React, { useEffect, useState } from 'react';
import '../../css/Card.css';
import axios from 'axios';

const Card = ({ imageUrl, title, faculty, nume, prenume, cod, semestru }) => {
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


  const handleDelete = async () => {
    try {
      console.log('Deleting Materie with Cod_Materie:', cod);
      await axios.delete(`http://localhost:8080/api/delete-materie/${cod}`);
      console.log('Materie deleted successfully');
    } catch (error) {
      console.error('Error deleting materie:', error);
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
      </div>
    </div>
  );
};

export default Card;