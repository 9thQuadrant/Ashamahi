import { useContext } from 'react';
import GlobalContext from '../../services/context';
import CardComponent, { IStory } from '../card/card';
import './card-list.scss';


const CardListComponent = (): JSX.Element => {

    const stories: {[key:string]: IStory} = useContext(GlobalContext.StoriesContext);

    return <>
        <div className='card-list-parent'>
            {
                Object.keys(stories).map((url, i) => {
                    return <CardComponent story={stories[url]} key={i}></CardComponent>
                })
            }
        </div>
    </>
}


export default CardListComponent;