import { createContext } from "react";

const StoriesContext = createContext({});
const DarkThemeContext = createContext(false);
const MobileContext = createContext(false);

const GlobalContext = { DarkThemeContext, MobileContext, StoriesContext };
export default GlobalContext;