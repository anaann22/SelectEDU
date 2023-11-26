import React, { useEffect, useState } from 'react';
import '../css/Card.css';

const Card = ({ imageUrl, title, faculty, nume, prenume, cod }) => {
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

  return (
    <div className="card">
      <img src={imageData} alt={title} className="card-image" />

      <div className="card-content">
        <h3 className="card-title">{cod}: {title}</h3>
        <p className="card-faculty">{faculty}</p>
        <p className="card-name">Profesor: {nume} {prenume}</p> 
        <div className="card-buttons">
          <button>Sterge materia</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
