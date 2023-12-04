import React from 'react';
import '../css/Choice.css';
import book from '../Poze/open-book.png';
import school from '../Poze/knowledge.png';
import { useNavigate } from 'react-router-dom';

const Choice_Page = () => {

    const navigate = useNavigate();

    const navigateTo = (route) => {
      navigate(route);
    };

    return (
        <div className='body'>
            <div className="container">
                <div className="left-choice">
                    <button onClick={() => navigateTo("/User")}>Vizualizare discipline complementare</button>
                    <img src={book} className="img" alt="Left Choice Image"/>
                </div>

                <div className="right-choice">
                    <button>Alegere discipline complementare</button>
                    <img src={school} className="img" alt="Right Choice Image"/>
                </div>
            </div>
         </div>
    );
};

export default Choice_Page;
