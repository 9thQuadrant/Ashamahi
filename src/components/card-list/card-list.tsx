import CardComponent from '../card/card';
import './card-list.scss';

const CardListComponent = (): JSX.Element => {
    return <>
        <div className='card-list-parent'>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
        </div>
    </>
}


export default CardListComponent;