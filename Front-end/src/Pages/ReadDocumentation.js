import React from 'react';
import '../css/readDoc.css'; 
import { useNavigate } from 'react-router-dom';
import right from '../Poze/right.png';

const ReadDocumentation = () => {
    const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/User');
    };
return (
    
    <div className="documentation-container">
      <div className="read-documentation-page">
        <h1>Ghid utilizator</h1>
        <p>
          Bine ați venit! Aici puteți găsi informații utile
          despre cum să utilizați această aplicație sau orice altă informație relevantă.
        </p>
      </div>
  
     {/* Adaugă tabelul aici */}
     <table className="read-documentation-table">
                <thead>
                    <tr>
                        <th>An</th>
                        <th>Facultate</th>
                        <th>Specialitate</th>
                        <th>Semestru I</th>
                        <th>Semestru II</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Adaugă aici rânduri pentru fiecare înregistrare din baza de date sau altă sursă */}
                    <tr>
                        <td>2</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Arte decorative</td>
                        <td> DA </td>
                        <th> ---- </th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Conservare Restaurare</td>
                        <td> ---- </td>
                        <th> DA </th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Design</td>
                        <td> ---- </td>
                        <th> DA </th>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Arte decorative</td>
                        <td> DA </td>
                        <th> DA </th>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Conservare Restaurare</td>
                        <td> ---- </td>
                        <th> DA </th>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Facultatea de Arte și Design </td>
                        <td>Design</td>
                        <td> ---- </td>
                        <th> DA </th>
                    </tr>
                </tbody>
            </table>

            <table className="read-documentation-table">
                <thead>
                    <tr>
                        <th>An</th>
                        <th>Facultate</th>
                        <th>Specialitate</th>
                        <th>Semestru I</th>
                        <th>Semestru II</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Adaugă aici rânduri pentru fiecare înregistrare din baza de date sau altă sursă */}
                    <tr>
                        <td>2</td>
                        <td>Facultatea de Matematică și Informatică </td>
                        <td>Informatică</td>
                        <td> DA </td>
                        <th> ---- </th>
                    </tr>
                    {/* Adaugă altele asemănătoare pentru mai multe înregistrări */}
                </tbody>
            </table>
            <div className="button-card" onClick={handleNextPage}>
             <button>Urmatoarea pagina</button>
</div>

        </div>
    );
};

export default ReadDocumentation;
