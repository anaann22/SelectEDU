import '../../css/Side_bar.css';
import carte from '../../Poze/books.png';
import AddMaterieCard from './AddMaterieCard.js';
import { useState } from 'react';

const Side_bar = () => {
    const [showAddMaterieCard, setShowAddMaterieCard] = useState(false);

    const handleAddMaterie = (newMaterie) => {

        console.log('Adding new Materie:', newMaterie);

    };

    return (
        <div className='container-side'>
            <div className='containder-side first'>
                <img src={carte} alt="img" className='img' />
                <button className="button" onClick={() => setShowAddMaterieCard(!showAddMaterieCard)}>
                    {showAddMaterieCard ? 'Înapoi' : 'Adăugare materie'}
                </button>
                {showAddMaterieCard && <AddMaterieCard onAddMaterie={handleAddMaterie} />}
            </div>
        </div>
    );
};

export default Side_bar;
