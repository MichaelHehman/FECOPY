import './App.css';  
import Activities from './pages/ActivitiesPage/Activities';  
import { Routes, Route, Navigate } from "react-router-dom";  
import Login from './pages/LoginPage/Login';  
import Signup from './pages/SignupPage/Signup';  
import Home from './pages/HomePage/Home';  
import Todo from './pages/ToDoPage/Todo';  
import Profile from './pages/ProfilePage/Profile';  
import AddTask from './pages/AddTaskPage/AddTask';  
import Navbar from './components/NavBar';  
import { Layout } from 'antd';  
import { useState, useEffect } from 'react';  
import { TaskProvider } from './context/TaskContext';  
  
const isAuthenticated = () => {  
  return !!localStorage.getItem("token");  
};  
  
function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);  
  
  useEffect(() => {  
    setTimeout(() => {  
      setIsLoggedIn(isAuthenticated());  
      setIsLoading(false);  
    }, 500);  
  }, []);  
  
  if (isLoading) {  
    return (  
      <Layout className="container">  
        {/* Add a loading spinner or message here if desired */}  
        <div className="loading-spinner">  
          <div className="spinner"></div>  
        </div>  
      </Layout>  
    );  
  }  
  
  return (  
    <TaskProvider>  
      <Layout className="container">  
        {isLoggedIn ? (  
          <>  
            <Layout.Header className="header">  
              <Navbar />  
            </Layout.Header>  
            <Layout.Content className="main-content">  
              <Routes>  
                <Route path="/" element={<Home />} />  
                <Route path="/dashboard" element={<Home />} />  
                <Route path="/activities" element={<Activities />} />  
                <Route path="/add-task" element={<AddTask />} />  
                <Route path="/to-do" element={<Todo />} />  
                <Route path="/profile" element={<Profile />} />  
                <Route path="*" element={<Navigate to="/" />} />  
              </Routes>  
            </Layout.Content>  
          </>  
        ) : (  
          <Layout.Content className="main-content">  
            <Routes>  
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />  
              <Route path="/signup" element={<Signup />} />  
              <Route path="*" element={<Navigate to="/login" />} />  
            </Routes>  
          </Layout.Content>  
        )}  
      </Layout>  
    </TaskProvider>  
  );  
}  
  
export default App;  