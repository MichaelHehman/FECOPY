import React from 'react';  
import { NavLink } from 'react-router-dom';  
import styles from './NavBar.module.css';  
  
function NavBar() {  
    return (  
        <nav className={styles.nav}>  
            <NavLink  
                to="/"  
                className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}  
                end  
            >  
                <img className={styles.icon} src="/assets/images/calendarIcon.png" alt="dashboard" />  
            </NavLink>  
            <NavLink  
                to="/activities"  
                className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}  
            >  
                <img className={styles.icon} src="/assets/images/activitiesIcon.png" alt="activities" />  
            </NavLink>  
            <NavLink  
                to="/add-task"  
                className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}  
            >  
                <img className={styles.icon} src="/assets/images/addIcon.png" alt="add task" />  
            </NavLink>  
            <NavLink  
                to="/to-do"  
                className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}  
            >  
                <img className={styles.icon} src="/assets/images/todoIcon.png" alt="to do" />  
            </NavLink>  
            <NavLink  
                to="/profile"  
                className={({ isActive }) => `${styles.navBtn} ${isActive ? styles.active : ''}`}  
            >  
                <img className={styles.icon} src="/assets/images/profileIcon.png" alt="profile" />  
            </NavLink>  
        </nav>  
    );  
}  
  
export default NavBar;  