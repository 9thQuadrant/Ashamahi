import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../../services/context';
import { emptyStory, IStory } from '../card/card';
import './story.scss';

const StoryComponent = (): JSX.Element => {

    const { id } = useParams();
    const storiesList: { [key: string]: IStory } = useContext(GlobalContext.StoriesContext);
    const [story, setStory] = useState<IStory>(emptyStory);

    useEffect(() => {
        if (id) {
            console.log(storiesList[id]);
            setStory(storiesList[id]);
        }
    }, [storiesList, id]);

    return <>
        <div className='story-page'>
            <div className='pre-accessibility'>&nbsp;</div>
            <div className='story-parent'>
                <div className='img'>
                    <div className='pre-empty-div'>&nbsp;</div>
                    <div className='image-wrapper'>
                        <img alt='pic of resin' className='actual-image' src={story.image} />
                    </div>
                    <div className='post-empty-div'>&nbsp;</div>
                </div>
                <div className='heading'>{story.title}</div>
                <div className='desc' dangerouslySetInnerHTML={{ __html: story.content || "" }}></div>
            </div>
            <div className='post-accessibility'>&nbsp;</div>
        </div>
    </>;
}

export default StoryComponent;