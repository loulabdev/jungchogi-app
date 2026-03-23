import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import BookmarksPage from '../pages/BookmarksPage';
import FrequentPage from '../pages/FrequentPage';
import HomePage from '../pages/HomePage';
import OxPage from '../pages/OxPage';
import SqlPracticePage from '../pages/SqlPracticePage';
import SubjectDetailPage from '../pages/SubjectDetailPage';
import WrongAnswersPage from '../pages/WrongAnswersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'subject/:subjectId', element: <SubjectDetailPage /> },
      { path: 'ox', element: <OxPage /> },
      { path: 'frequent', element: <FrequentPage /> },
      { path: 'sql', element: <SqlPracticePage /> },
      { path: 'wrong', element: <WrongAnswersPage /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
    ],
  },
]);
