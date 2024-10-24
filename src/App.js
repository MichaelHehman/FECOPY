import './App.css';
import Activities from './pages/ActivitiesPage/Activities';

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/HomePage/Home';
import Todo from './pages/ToDoPage/Todo';
import Profile from './pages/ProfilePage/Profile';
import AddTask from './pages/AddTaskPage/AddTask';
import Navbar from './components/NavBar';
import { Layout } from 'antd';

function App() {
  return (
    <Layout className="container">
      <Layout.Header className="header">
        Split Chores
      </Layout.Header>
      <Layout.Content className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/to-do" element={<Todo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout.Content>
      <Layout.Footer className="footer">
        <Navbar />
      </Layout.Footer>
    </Layout>
  );
}

export default App;