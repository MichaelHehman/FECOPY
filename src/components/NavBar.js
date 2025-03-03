import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
    const location = useLocation();
    const {pathname} = location;
const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={styles.navBtn}>
                <img className={styles.icon} src="/assets/images/calendarIcon.png" alt="dashboard" />
            </NavLink>
            <NavLink to="/activities" className={styles.navBtn}>
                <img className={styles.icon} src="/assets/images/activitiesIcon.png" alt="activities" />
            </NavLink>
            <NavLink to="/add-task" className={styles.navBtn}>
                <img className={styles.icon} src="/assets/images/addIcon.png" alt="add task" />
            </NavLink>
            <NavLink to="/to-do" className={styles.navBtn}>
                <img className={styles.icon} src="/assets/images/todoIcon.png" alt="to do" />
            </NavLink>
            <NavLink to="/profile" className={styles.navBtn}>
                <img className={styles.icon} src="/assets/images/profileIcon.png" alt="profile" />
            </NavLink>
        </nav>
    );
};

export default Navbar;
