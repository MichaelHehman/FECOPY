import './App.css';
import Activities from './pages/ActivitiesPage/Activities';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import Home from './pages/HomePage/Home';
import Todo from './pages/ToDoPage/Todo';
import Profile from './pages/ProfilePage/Profile';
import AddTask from './pages/AddTaskPage/AddTask';
import Navbar from './components/NavBar';
import { Layout } from 'antd';
import styles from './App.css';

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
    <Layout className="container">
      <Layout.Header className="header">
        <div>
          Split Chores
        </div>
      </Layout.Header>
      <Layout.Content className="main">
        <RouterProvider router={router} />
      </Layout.Content>
      <Layout.Footer className="footer">
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Layout.Footer>
    </Layout>
  );
}

export default App;