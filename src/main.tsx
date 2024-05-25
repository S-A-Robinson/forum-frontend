import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import NavBar from './components/NavBar/NavBar';
import Group from './routes/Group/Group.tsx';
import Post from './routes/Post/Post';
import NewPost from './routes/NewPost/NewPost';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <NavBar/>,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/group/:groupId',
        element: <Group />
      },
      {
        path: '/post/:postId',
        element: <Post />
      },
      {
        path: '/post/new',
        element: <NewPost />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
