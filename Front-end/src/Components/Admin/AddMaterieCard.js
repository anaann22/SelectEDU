import React, { useState } from 'react';
import '../../css/AddMaterieCard.css';

const AddMaterieCard = ({ onAddMaterie }) => {
  const [newMaterie, setNewMaterie] = useState({
    Nume_Materie: '',
    Cod_Materie: '',
    Profesor_Email: '',
    Faculty: '',
    Profesor_Nume: '',
    Profesor_Prenume: '',
    Semestru: '',
    Poza_Materie: null, 
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const val = type === 'file' ? e.target.files[0] : value;

    setNewMaterie((prevMaterie) => ({
      ...prevMaterie,
      [name]: val,
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(newMaterie).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('http://localhost:8080/api/add-materie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterie),
      });

      if (response.ok) {
        onAddMaterie(newMaterie);

        setNewMaterie({
          Nume_Materie: '',
          Cod_Materie: '',
          Profesor_Email: '',
          Faculty: '',
          Profesor_Nume: '',
          Profesor_Prenume: '',
          Semestru: '',
          Poza_Materie: null,
        });
      } else {
        console.error('Failed to add Materie:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div className="add-materie-card">
      <h2>Adauga materie</h2>
      <input
        type="text"
        placeholder="Nume Materie"
        name="Nume_Materie"
        value={newMaterie.Nume_Materie}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cod Materie"
        name="Cod_Materie"
        value={newMaterie.Cod_Materie}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Profesor Email"
        name="Profesor_Email"
        value={newMaterie.Profesor_Email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Faculty"
        name="Faculty"
        value={newMaterie.Faculty}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nume"
        name="Profesor_Nume"
        value={newMaterie.Profesor_Nume}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Prenume"
        name="Profesor_Prenume"
        value={newMaterie.Profesor_Prenume}
        onChange={handleChange}
      />
      <select
        name="Semestru"
        value={newMaterie.Semestru}
        onChange={handleChange}
      >
        <option value="">Selecteaza Semestrul</option>
        <option value="Semestrul I">Semestrul I</option>
        <option value="Semestrul II">Semestrul II</option>
      </select>
      <input
        type="file"
        name="Poza_Materie"
        onChange={handleChange}
      />
      <button className="button" onClick={handleSave}>Salvare</button>
    </div>
  );
};

export default AddMaterieCard;
