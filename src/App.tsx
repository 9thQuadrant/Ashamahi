import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header/header';
import RoutesMap from './routes/routes';
import { useEffect, useState } from 'react';
import { storiesQuery } from './services/firebase';
import { IStory } from './components/card/card';
import { getDocs } from 'firebase/firestore';
import GlobalContext from './services/context';
import checkIfMobile from './services/utils';
function App() {
  const [storiesList, setStoriesList] = useState<{[key:string]: IStory}>({});
  
  useEffect(()=>{
    
    const tempStory: {[key:string]: IStory} = {};
    getDocs(storiesQuery).then((q) => {
      q.forEach((doc) => {
        const d: IStory = doc.data() as IStory;
        tempStory[d.url] = d;
      });
      setStoriesList(tempStory);
    });
  }, []);
  


  return (
    <>
      <GlobalContext.StoriesContext.Provider value={storiesList}>
      <GlobalContext.MobileContext.Provider value={checkIfMobile()}>
      <GlobalContext.DarkThemeContext.Provider value={false}>
        {Object.keys(storiesList).length && <>
        <HeaderComponent></HeaderComponent>
        <BrowserRouter>
          <RoutesMap/>
        </BrowserRouter>
        </>
        }
      </GlobalContext.DarkThemeContext.Provider>
      </GlobalContext.MobileContext.Provider>
      </GlobalContext.StoriesContext.Provider>
    </>
  );
}

export default App;
