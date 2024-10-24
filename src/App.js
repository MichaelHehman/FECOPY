import './App.css';
import Activities from './pages/ActivitiesPage/Activities';
import Home from './pages/HomePage/Home';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import Todo from './pages/ToDoPage/Todo';
import Profile from './pages/ProfilePage/Profile';
import AddTask from './pages/AddTaskPage/AddTask';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/activities",
      element: <Activities />,
    },
    {
      path: "/add-task",
      element: <AddTask />,
    },
    {
      path: "/to-do",
      element: <Todo />,
    },
    {
      path: "/profile",
      element: <Profile />,
    }
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;