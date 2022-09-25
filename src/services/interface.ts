import { Timestamp } from 'firebase/firestore';


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
    slideShowImages: string;
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