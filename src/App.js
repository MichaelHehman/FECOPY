import React, { Suspense } from 'react';  
import { Routes, Route, useLocation } from 'react-router-dom';  
import { TransitionGroup, CSSTransition } from 'react-transition-group';  
import NavBar from './components/NavBar';  
  
// Import your page components  
import Home from './pages/HomePage/Home';  
import Activities from './pages/ActivitiesPage/Activities';  
import AddTask from './pages/AddTaskPage/AddTask';  
import Todo from './pages/TodoPage/Todo';  
import Profile from './pages/ProfilePage/Profile';  
import Login from './pages/LoginPage/Login';  
import Signup from './pages/SignupPage/Signup';  
  
// Loading component    
const LoadingFallback = () => (    
    <div className="loading-spinner">    
        <div className="spinner"></div>    
    </div>    
);  
  
function AppContent() {  
    const location = useLocation();  
  
    return (  
        <div className="app-container">  
            <Suspense fallback={<LoadingFallback />}>  
                <TransitionGroup component={null}>  
                    <CSSTransition key={location.key} classNames="page" timeout={300}>  
                        <main className="main-content">  
                            <Routes location={location}>  
                                <Route path="/" element={<Home />} />  
                                <Route path="/activities" element={<Activities />} />  
                                <Route path="/add-task" element={<AddTask />} />  
                                <Route path="/to-do" element={<Todo />} />  
                                <Route path="/profile" element={<Profile />} />  
                                <Route path="/login" element={<Login />} />  
                                <Route path="/signup" element={<Signup />} />  
                            </Routes>  
                        </main>  
                    </CSSTransition>  
                </TransitionGroup>  
            </Suspense>  
            <NavBar />  
        </div>  
    );  
}  
  
function App() {  
    return (  
        <AppContent />  
    );  
}  
  
export default App;  