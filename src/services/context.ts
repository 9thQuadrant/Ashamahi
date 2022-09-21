import { createContext } from "react";

export type CurrentStoryType = {
    currentStory: string | null,
    setCurrentStory: React.Dispatch<React.SetStateAction<string>>
}

const CurrentStory: any = createContext<CurrentStoryType>({currentStory: "", setCurrentStory: () => {}});
const StoriesContext = createContext({});
const MobileContext = createContext(false);

const GlobalContext = { MobileContext, StoriesContext, CurrentStory };
export default GlobalContext;