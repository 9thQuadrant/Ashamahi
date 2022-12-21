import { useContext, useEffect } from 'react';
import './card-list.scss';
import { AppContext } from '../../services/context';
import CardComponent from '../card/card';
import { updateCurrentStory } from '../../services/AppActions';
import { useParams } from 'react-router-dom';


const CardListComponent = (): JSX.Element => {


    const {state: {isMobile, storiesList}, dispatch} = useContext(AppContext) as any;

    const { category } = useParams();

    useEffect(()=>{
        dispatch(updateCurrentStory(null));
    }, []);

    return <>
        <div className={`card-list-parent ${isMobile ? 'mobile': 'desktop'}`}>
            {
                Object.keys(storiesList).map((url) => {
                    return storiesList[url].category === category ? <CardComponent story={storiesList[url]} key={url}></CardComponent> : <></>
                })
            }
        </div>
    </>
}


export default CardListComponent;