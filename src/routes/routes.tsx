import { Route, Routes } from 'react-router-dom';
import NotFoundComponent from '../components/404/not-found';
import CardListComponent from '../components/card-list/card-list';
import StoryComponent from '../components/story/story';

const RoutesMap = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<CardListComponent />} />
      <Route path="/item/:id" element={<StoryComponent /> } />
      <Route path="*" element={<NotFoundComponent /> } />
    </Routes>
  );
};

export default RoutesMap;
