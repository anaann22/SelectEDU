// Import necessary modules and images
import React from 'react';
import '../css/Choice.css';
import book from '../Poze/open-book.png';
import school from '../Poze/knowledge.png';
import guide from '../Poze/guide.png';
import confirm from '../Poze/confirm.png';
import { useNavigate } from 'react-router-dom';

const Choice_Page = () => {

    const navigate = useNavigate();

    const navigateTo = (route) => {
      navigate(route);
    };

    return (
        <div className='body'>
            <div className="container">

                {/* Card for "Citire documentatie" */}
                <div className="middle-choice">
                    <button onClick={() => navigateTo("/ReadDocumentation")}>Ghid utilizare</button>
                    <img src={guide} className="img" alt="Middle Choice Image"/>
                </div>

                {/* Card for "Vizualizare discipline" */}
                <div className="left-choice">
                    <button onClick={() => navigateTo("/User")}>Vizualizare discipline complementare</button>
                    <img src={book} className="img" alt="Left Choice Image"/>
                </div>

                {/* Card for "Alegere discipline" */}
                <div className="right-choice">
                    <button onClick={() => navigateTo("/UserChoice")}>Alegere discipline complementare</button>
                    <img src={school} className="img" alt="Right Choice Image"/>
                </div>

                {/* Card for "Confirmare" */}
                <div className="confirm-choice">
                    <button onClick={() => navigateTo("/Confirm")}>Confirmare</button>
                    <img src={confirm} className="img" alt="Confirm Choice Image"/>
                </div>
            </div>
         </div>
    );
};

export default Choice_Page;
