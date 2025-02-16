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
                <label htmlFor="qty" className={styles.numberLabel}>Number of tickets:</label>
                <br />
                <select name="qty" id="qty" className={styles.number}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button1} type="submit" onClick={() => navigate('details')}> Next</button>
                <button className={styles.button2} >Close</button>
            </div>
        
        </div>
    </>
}
