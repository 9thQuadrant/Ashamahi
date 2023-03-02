import { ACTIONS } from './context';
import { IStory } from './interface';

class CreateAction {
    type: string;
    data: any;
    constructor(type: string, data: any) {
        this.type = type;
        this.data = data;
    }
}


export function updateStories(data: { [key: string]: IStory }) {
    return new CreateAction(ACTIONS.UPDATE_STORIES, data);
}

export function updateCurrentStory(data: IStory | null) {
    return new CreateAction(ACTIONS.UPDATE_CURRENT_STORY, data);
}

export function updateIsMobile(data: boolean) {
    return new CreateAction(ACTIONS.IS_MOBILE, data);
}
export function updateCategories(data: Set<string>) {
    return new CreateAction(ACTIONS.UPDATE_CATEGORY_LIST, data);
}
export function updateCategoryImage(data: object) {
    return new CreateAction(ACTIONS.UPDATE_CATEGORY_IMAGE, data);
}