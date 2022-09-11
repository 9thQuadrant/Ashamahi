import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/header/header';
import RoutesMap from './routes/routes';

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <BrowserRouter>
        <RoutesMap />
      </BrowserRouter>
    </>
  );
}

export default App;
