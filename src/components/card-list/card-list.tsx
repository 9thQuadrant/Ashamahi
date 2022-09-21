import { useContext } from 'react';
import GlobalContext, { CurrentStoryType } from '../../services/context';
import CardComponent, { IStory } from '../card/card';
import './card-list.scss';
import { useEffect } from 'react';


const CardListComponent = (): JSX.Element => {

    const isMobile = useContext(GlobalContext.MobileContext);
    const {currentStory, setCurrentStory} = useContext(GlobalContext.CurrentStory) as CurrentStoryType;

    const stories: {[key:string]: IStory} = useContext(GlobalContext.StoriesContext);

    useEffect(()=>{
        setCurrentStory("");
    }, []);

    return <>
        <div className={`card-list-parent ${isMobile ? 'mobile': 'desktop'}`}>
            {
                Object.keys(stories).map((url, i) => {
                    return <CardComponent story={stories[url]} key={i}></CardComponent>
                })
            }
        </div>
    </>
}


export default CardListComponent;