import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import HeaderComponent from './components/header/header';
import RoutesMap from './routes/routes';
import { useEffect, useReducer } from 'react';
import { storiesQuery } from './services/firebase';
import { getDocs } from 'firebase/firestore';
import checkIfMobile from './services/utils';
import { IStory } from './services/interface';
import { updateIsMobile, updateStories } from './services/AppActions';
import { AppContext, AppReducer, InitialAppState } from './services/context';


function App() {

  const [state, dispatch] = useReducer(
    AppReducer,
    new InitialAppState()
  );

  useEffect(() => {

    const tempStory: { [key: string]: IStory } = {};
    getDocs(storiesQuery).then((q) => {
      q.forEach((doc) => {
        const d: IStory = doc.data() as IStory;
        tempStory[d.url] = d;
      });
      dispatch(updateStories(tempStory));
      dispatch(updateIsMobile(checkIfMobile()));
    });
  }, []);


  const context: any = { state, dispatch };

  return (
    <>
      <AppContext.Provider value={context}>
            <BrowserRouter>
              <HeaderComponent></HeaderComponent>
              <RoutesMap />
            </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
