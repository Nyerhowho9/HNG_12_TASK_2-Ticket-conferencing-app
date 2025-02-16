import React from "react";
import styles from '../styles/Hero.module.css'

export default function Hero(){
    return <>
        <div className={styles.heroContainer}>
            <h1 className={styles.eventName}>Techember Fest ”25</h1>
            <p className={styles.heroText}>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
            <div className={styles.locationContainer}>
                <p>📍 LANDMARK BEACH</p>
                <p className={styles.date}><span className={styles.part}>||  </span>   March 15, 2025 | 7:00 PM</p>
            </div>
        </div>
    </>
}