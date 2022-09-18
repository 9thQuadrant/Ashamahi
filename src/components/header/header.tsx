import { Link } from 'react-router-dom';
import './header.scss';

const HeaderComponent = (): JSX.Element => {
    return <>
    <div className='header'>
        <Link to="/" className='logo'>Asha Mahi</Link>
        <div className="desc">Resin keychains and gifts items</div>
    </div>
    </>;
};

export default HeaderComponent;