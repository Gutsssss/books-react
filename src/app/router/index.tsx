import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import { BooksPage } from '../../pages/books';
import { HomePage } from '../../pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
        {
            index:true,
            element:<HomePage/>
        },
        {
            path:'books',
            element:<BooksPage/>
        }
    ]
  },
]);