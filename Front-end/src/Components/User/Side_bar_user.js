import '../../css/Side_bar.css';
import carte from '../../Poze/books.png';
import { useNavigate } from 'react-router-dom';

const Side_bar_user = () => {

    const navigate = useNavigate();

    const navigateTo = (route) => {
      navigate(route);
    };

    return (
        <>
        <div className='container-side'>
            <div className='containder-side first'>
                <img src={carte} alt="img" className='img' />
            </div>
            <div className='containder-side third'>
                <button className='button' onClick={() => navigateTo("/Choice")}>Inapoi</button>
            </div>
        </div>
        
        </>
    );
};

export default Side_bar_user;
