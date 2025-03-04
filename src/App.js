import React, { Suspense } from 'react';  
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';  
import { TransitionGroup, CSSTransition } from 'react-transition-group';  
import NavBar from './components/NavBar';  
import './App.css';  
  
// Lazy load pages for better performance  
const Home = React.lazy(() => import('./pages/HomePage/Home'));  
const Activities = React.lazy(() => import('./pages/ActivitiesPage/Activities'));  
const AddTask = React.lazy(() => import('./pages/AddTaskPage/AddTask'));  
const Todo = React.lazy(() => import('./pages/ToDoPage/Todo'));  
const Profile = React.lazy(() => import('./pages/ProfilePage/Profile'));  
const Login = React.lazy(() => import('./pages/LoginPage/Login'));  
const Signup = React.lazy(() => import('./pages/SignupPage/Signup'));  
  
// Loading component  
const LoadingFallback = () => (  
    <div className="loading-spinner">  
        <div className="spinner"></div>  
    </div>  
);  
  
// Main app content with transitions  
function AppContent() {  
    const location = useLocation();  
  
    return (  
        <div className="app-container">  
            <Suspense fallback={<LoadingFallback />}>  
                <TransitionGroup component={null}>  
                    <CSSTransition  
                        key={location.key}  
                        classNames="page"  
                        timeout={300}  
                    >  
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
        <BrowserRouter>  
            <AppContent />  
        </BrowserRouter>  
    );  
}  
  
export default App;  