import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import styles from  '../styles/Navbar.module.css'
import Logo from '../assets/Logo.png'
import Arrow from '../assets/RightArrow.png'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return <>
         <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={Logo} alt="Ticz Logo" />
            </div>
           
            <ul className={`${styles.list} ${isOpen ? styles.open : ""}`}>
                <li >
                    <NavLink to="/" className={styles.navlink}>Events</NavLink>
                </li>
                <li className={styles.listItem}>
                 <NavLink to="/tickets" className={styles.navlink}>My Tickets</NavLink>
                </li>
                <li className={styles.listItem}>
                    <NavLink to="/project" className={styles.navlink}>About Project</NavLink>
                </li>
            </ul>


            <button className={styles.myTickets} onClick={() => setIsOpen(!isOpen)}>My Tickets <span ><img src={Arrow} alt="right arrow" className={styles.arrow}/></span> </button>
        </nav>
    </>
}