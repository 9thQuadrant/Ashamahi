import { Route, Routes } from 'react-router-dom';
import NotFoundComponent from '../components/404/not-found';
import CardListComponent from '../components/card-list/card-list';
import CategoryListComponent from '../components/category-list/category-list';
import StoryComponent from '../components/story/story';

const RoutesMap = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/category/:category" element={<CardListComponent />} />
      <Route path="/" element={<CategoryListComponent />} />
      <Route path="/item/:id" element={<StoryComponent /> } />
      <Route path="*" element={<NotFoundComponent /> } />
    </Routes>
  );
};

export default RoutesMap;
