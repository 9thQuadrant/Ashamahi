import { useContext, useEffect } from 'react';
import './card-list.scss';
import { AppContext } from '../../services/context';
import CardComponent from '../card/card';
import { updateCurrentStory } from '../../services/AppActions';


const CardListComponent = (): JSX.Element => {


    const {state: {isMobile, storiesList}, dispatch} = useContext(AppContext) as any;

    useEffect(()=>{
        dispatch(updateCurrentStory(null));
    }, []);

    return <>
        <div className={`card-list-parent ${isMobile ? 'mobile': 'desktop'}`}>
            {
                Object.keys(storiesList).map((url, i) => {
                    return <CardComponent story={storiesList[url]} key={i}></CardComponent>
                })
            }
        </div>
    </>
}


export default CardListComponent;