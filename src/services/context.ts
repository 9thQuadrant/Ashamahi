import { createContext } from "react";

const StoriesContext = createContext({});
const MobileContext = createContext(false);

const GlobalContext = { MobileContext, StoriesContext };
export default GlobalContext;
