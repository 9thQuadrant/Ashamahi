import { Link } from 'react-router-dom';
import GlobalContext, { CurrentStoryType } from '../../services/context';
import AshaMahiSvgComponent from './ashamahi';
import './header.scss';
import { useContext } from 'react';
import { IStory } from '../card/card';

const HeaderComponent = (): JSX.Element => {

    const {currentStory, setCurrentStory} = useContext(GlobalContext.CurrentStory) as CurrentStoryType;
    const stories: {[key:string]: IStory} = useContext(GlobalContext.StoriesContext);

    return <>
    <div className={`header ${Object.keys(stories).length ? '': 'full-height'}`}>
        <Link to="/" className='logo'>
            <AshaMahiSvgComponent />
        </Link>
        <div className="desc">{currentStory}</div>
    </div>
    </>;
};

export default HeaderComponent;