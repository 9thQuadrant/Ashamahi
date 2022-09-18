import { Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './card.scss';

const CardComponent = (props: ICardProps): JSX.Element => {

    function getDateAndDay(time: Timestamp) {
        const obj = time.toDate();
        const monthObj = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jue', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${obj.getDay() + 1 } ${monthObj[obj.getUTCMonth() - 1]}`;
    }
    return <>
        <div className='card-parent'>
            <div className='img-wrapper'>
                <img className='img' alt="resin made of dry flowers" src={props.story.image} />
            </div>
            <div className='details'>
                <div className="tags"></div>
                <div className="heading">
                    <Link to={'item/' + props.story.url}>{props.story.title}</Link>
                </div>
                <div className="desc">{props.story.shortnote}</div>
                <div className='utils'>
                    <div className='date-updated'>
                        <span className="icon">event</span>
                        <span className="date">{getDateAndDay(props.story.modified_date)}</span>
                    </div>
                    <div className='order'>
                        <a href={`https://wa.me/919492590121?text=${props.story.url}`} className="order-wrapper">
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

export interface ICardProps {
    story: IStory
} 
export interface IStory {
    category: string;
    content: string;
    created_date: Timestamp;
    id: string;
    image: string;
    liveStatus: boolean;
    metaImageLink: string;
    meta_author: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    modified_date: Timestamp;
    shareCount: number;
    shortnote: string;
    title: string;
    url: string;
    viewCount: number;
}

export const emptyStory = {
    category: "string",
    content: "string",
    created_date: new Timestamp(0, 0),
    id: "string",
    image: "string",
    liveStatus: false,
    metaImageLink: "string",
    meta_author: "string",
    meta_description: "string",
    meta_keywords: "string",
    meta_title: "string",
    modified_date: new Timestamp(0, 0),
    shareCount: 0,
    shortnote: "string",
    title: "string",
    url: "string",
    viewCount: 0,
}