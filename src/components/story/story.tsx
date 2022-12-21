import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateCurrentStory } from '../../services/AppActions';
import { AppContext } from '../../services/context';
import { IStory } from '../../services/interface';
import './story.scss';
import 'react-slideshow-image/dist/styles.css';
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from 'react-image-gallery';
import { getDateAndDay, getUrl } from '../../services/utils';


const StoryComponent = (): JSX.Element => {

    const { id } = useParams();
    const { state: { storiesList, isMobile }, dispatch } = useContext(AppContext) as any;
    const [story, setStory] = useState<IStory | null>(null);
    const [imagesForSlideshow, setImagesForSlideshow] = useState<any>([]);
    useEffect(() => {
        if (id) {
            setStory(storiesList[id]);
            dispatch(updateCurrentStory(storiesList[id]));
            const tempImages: any[] = [];
            storiesList[id]?.slideShowImages.split('||').forEach((url: string) => {
                tempImages.push({ original: url });
            })
            setImagesForSlideshow(tempImages);
        }
    // eslint-disable-next-line
    }, [storiesList, id]);



    return <>
        {story ?
            <div className='story-page'>
                {!isMobile ? <div className='pre-accessibility'>&nbsp;</div> : <></>}
                <div className={`story-parent ${isMobile ? '' : 'w3-border'}`}>
                    <div className='img-parent'>
                        {!isMobile ? <div className='pre-empty-div'>&nbsp;</div> : <></>}
                        <div className='image-custom-wrapper'>
                            <img alt='pic of resin' className='actual-image' src={story?.image} />
                        </div>
                        <div className='post-empty-div'>&nbsp;</div>
                    </div>
                    <div className='heading'>{story.title}</div>
                    <div className='slideshow-parent'>
                        { !isMobile ? <div className="pre">&nbsp;</div> : <></> }
                        <ImageGallery showThumbnails={false} items={imagesForSlideshow} showNav={false} showPlayButton={false} showBullets={true} showFullscreenButton={false} autoPlay={true} infinite={true} />
                        { !isMobile ? <div className="post">&nbsp;</div> : <></> }
                    </div>
                    <div className='utils'>
                        { !isMobile ? <div className="pre">&nbsp;</div> : <></> }
                        <div className='order-island'>
                            <div className='date-updated'>
                                <span className="icon">event</span>
                                <span className="date">{getDateAndDay(story.modified_date)}</span>
                            </div>
                            <div className='order'>
                                <a href={getUrl(story.url)} className="order-wrapper">
                                    <span className='icon'>shopping_cart</span>
                                    <span className='order-text'>Order</span>
                                </a>
                            </div>
                        </div>
                        { !isMobile ? <div className="post">&nbsp;</div> : <></> }
                    </div>
                    <div className='desc' dangerouslySetInnerHTML={{ __html: story?.content || "" }}></div>
                </div>
                {!isMobile ? <div className='post-accessibility'>&nbsp;</div> : <></>}
            </div>
            : <></>}
    </>;
}

export default StoryComponent;