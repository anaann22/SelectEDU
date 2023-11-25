import React from 'react';
import '../css/Choice.css';
import book from '../Poze/open-book.png';
import school from '../Poze/knowledge.png'

const Choice_Page = () => {
    return (
        <div className='body'>
            <div className="container">
                <div className="left-choice">
                    <button>Vizualizare discipline complementare</button>
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
