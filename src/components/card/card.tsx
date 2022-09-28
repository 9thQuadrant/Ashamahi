import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './card.scss';
import { ICardProps } from '../../services/interface';
import { AppContext } from '../../services/context';
import { getDateAndDay, getUrl } from '../../services/utils';

const CardComponent = (props: ICardProps): JSX.Element => {

    const {state: {isMobile}} = useContext(AppContext) as any;

    return <>
        <div className={`card-parent ${isMobile ? 'mobile': 'desktop'}`} >
            <div className='img-wrapper'>
                <img className='img' alt="resin made of dry flowers" src={props.story.image} />
            </div>
            <div className='details'>
                <div className="tags"></div>
                <div className="heading">
                    <Link to={'item/' + props.story.url}>{props.story.title}</Link>
                </div>
                <div className="desc">
                    <Link to={'item/' + props.story.url}>
                        {props.story.shortnote}
                    </Link>
                </div>
                <div className='utils'>
                    <div className='date-updated'>
                        <span className="icon">event</span>
                        <span className="date">{getDateAndDay(props.story.modified_date)}</span>
                    </div>
                    <div className='order'>
                        <a href={getUrl(props.story.url)} className="order-wrapper">
                            <span className='icon'>shopping_cart</span>
                            <span className='order-text'>Order</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    
    </>
}

export default CardComponent;