import { Link } from 'react-router-dom';
import AshaMahiSvgComponent from './ashamahi';
import './header.scss';
import { useContext } from 'react';
import { AppContext } from '../../services/context';

const HeaderComponent = (): JSX.Element => {

    const {state: {currentStory, storiesList}} = useContext(AppContext) as any;

    return <>
    <div className={`header ${Object.keys(storiesList).length ? '': 'full-height'}`}>
        <Link to="/" className='logo'>
            <AshaMahiSvgComponent />
        </Link>
        <div className="desc">{currentStory?.shortnote ? currentStory.shortnote : "Resin Art works"}</div>
    </div>
    </>;
};

export default HeaderComponent;