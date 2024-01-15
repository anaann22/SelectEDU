import React from 'react';
import '../css/readDoc.css'; 
import { useNavigate } from 'react-router-dom';


const ReadDocumentation = () => {
    const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/Choice');
    };
return (
    
    <div className="documentation-container">
      <div className="read-documentation-page">
        <h1>Ghid utilizator</h1>
        <p>Bine ați venit! </p>
        <p>Pentru o înțelegere mai ușoară a procesului de alegere a materiei complementare v-am pregătit un set de reguli care vor face experiența mult mai ușoară.</p>
        <ul>
        {/* <li>Pentru a nu fi surprins în ce constă materia și criteriile de evaluare ar fi bine citită fișa disciplinei.</li> */}
        <li>În momentul în care posibilitatea de alegere a materiile complementare este deschisă sunt sanșe sa fie îngreunată parcurgerea pașilor, deoarece sunt mulți utilizatori.</li>
        <li>Parcurgeți cu atenție materiile disponibile pentru a ușura alegerea acesteia.</li>
        <li>Când materiile trebuie alese, încercați să vă pregătiți cu 10 minute înainte. Astfel, riscați ocuparea locurilor la cursul dorit. </li>
      </ul>
      </div>
  
        <button className="button-card2" onClick={handleNextPage}>Înapoi</button>

</div>


    );
};

export default ReadDocumentation;
