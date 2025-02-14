import React from "react";
import styles from '../styles/Heading.module.css'

export default function Headng(props) {
    return <>
        <div className={styles.headingContainer}>
            <div className={styles.stepName}>
                <p className={styles.p1}>{props.title}</p>   
                <p className={styles.step}>{props.steps}</p> 
            </div>    
            
        </div>
       
    </>
}