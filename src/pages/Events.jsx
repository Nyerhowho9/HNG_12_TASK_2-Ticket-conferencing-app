import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import ProgressBar from "../components/ProgressBar";
import TicketType from "../components/TicketType";
import styles from '../styles/Events.module.css'

export default function Event(){
    const navigate = useNavigate()
    return <>
        <NavBar />
        <div  className={styles.container}>
            <div className={styles.headingContainer}>
                <div className={styles.stepName}>
                    <h1 className={styles.p1}>Ticket Selection</h1>   
                    <p className={styles.step}>Step 1/3</p> 
                </div>    
                
            </div>
            <div  className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                </div>
            </div>
            <Hero/>
            <ProgressBar />
            <p className={styles.select}>Select Ticket Type:</p>
            <div className={styles.typeContainer}>
                <TicketType price="Free" access="REGULAR ACCESS" quantity="20/52"  />
                <TicketType price="$150" access="VIP ACCESS" quantity="20/52"  />
                <TicketType price="$150" access="VVIIP ACCESS" quantity="20/52"  />
            </div>
            <div className={styles.numberContainer}>
                <p className={styles.number}>Number of tickets:</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button1}  onClick={() => navigate('details')}> Next</button>
                <button className={styles.button2} >Close</button>
            </div>
        
        </div>
    </>
}
