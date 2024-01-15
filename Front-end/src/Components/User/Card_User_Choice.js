import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import Confirm from '../../Pages/Confirm';
import axios from 'axios';
import '../../css/readDoc.css';

const YourSeparatedTablesComponent = () => {
  const [cards, setCards] = useState([]);
  const [selectedMaterii, setSelectedMaterii] = useState([]);
  const [selectedMateriePopup, setSelectedMateriePopup] = useState(false);
  const [isMaterieSelected, setIsMaterieSelected] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllImageInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/all-image-info');
        const allImageInfo = response.data;

        const imageDataArray = allImageInfo.map((imageInfo) => ({
          id: imageInfo.id,
          imageUrl: imageInfo.Poza_Materie,
          title: imageInfo.Nume_Materie,
          faculty: imageInfo.Faculty,
          cod: imageInfo.Cod_Materie,
          nume: imageInfo.Profesor_Nume,
          prenume: imageInfo.Profesor_Prenume,
          semestru: imageInfo.Semestru,
          studenti: imageInfo.numarMaximUtilizatori,
        }));

        setCards(imageDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllImageInfo();
  }, []);

  // Filter cards for Semester I
  const semester1Cards = cards.filter((card) => card.semestru === 'Semestrul I');

  // Filter cards for Semester II
  const semester2Cards = cards.filter((card) => card.semestru === 'Semestrul II');

  const handleChooseMaterie = (cod, semestru, title) => {
    if (selectedMaterii.length < 2) {
      setSelectedMaterii((prevSelectedMaterii) => [...prevSelectedMaterii, { cod, semestru, title }]);
      setSelectedMateriePopup(true);
  
      if (selectedMaterii.length + 1 === 2) {
        // Navigate to the confirmation page when two materii are selected
        navigate('/Confirm', { state: { selectedMaterii: [...selectedMaterii, { cod, semestru, title }] } });
      }
    } else {
      console.log('You can only choose up to two materii.');
    }
  };
  

  const buttonClass = isMaterieSelected ? 'selected-button' : 'default-button';

  return (
    <div className="table-container">
      {/* Semester I Table */}
      <table className="read-documentation-table">
        <caption className='caption'>Semestrul I</caption>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Materie</th>
            <th>Facultate</th>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Semestru</th>
            <th>Locuri alocate</th>
            <th>Alegere</th>
          </tr>
        </thead>
        <tbody>
          {semester1Cards.map((card) => (
            <tr key={card.cod}>
              <td>{card.cod}</td>
              <td>{card.title}</td>
              <td>{card.faculty}</td>
              <td>{card.nume}</td>
              <td>{card.prenume}</td>
              <td>{card.semestru}</td>
              <td>{card.studenti}</td>
              <td>
                <button onClick={() => handleChooseMaterie(card.cod, card.semestru, card.title)}>
                Aleg aceasta materie
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Semester II Table */}
      <table className="read-documentation-table">
        <caption className='caption'>Semestrul II</caption>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Materie</th>
            <th>Facultate</th>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Semestru</th>
            <th>Locuri alocate</th>
            <th>Alegere</th>
          </tr>
        </thead>
        <tbody>
          {semester2Cards.map((card) => (
            <tr key={card.cod}>
              <td>{card.cod}</td>
              <td>{card.title}</td>
              <td>{card.faculty}</td>
              <td>{card.nume}</td>
              <td>{card.prenume}</td>
              <td>{card.semestru}</td>
              <td>{card.studenti}</td>
              <td>
                <button onClick={() => handleChooseMaterie(card.cod, card.semestru, card.title)}>
                  Aleg aceasta materie
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
  );
};

export default YourSeparatedTablesComponent;
