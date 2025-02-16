import React, { useState} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Headng from '../components/Heading'
import Details from './Details'
import BackG from '../assets/bgI.png'
import Barcode from '../assets/editedBarcode.png'
import styles from '../styles/ReadyTicket.module.css'


export default function ReadyTicket({ fullName, email, avatar, aboutProject }) {
    const location = useLocation();
    const navigate = useNavigate();

    
    
    const formData = location.state?.formData; 
    const [selectedTicket, setSelectedTicket] = useState(() => {
        try {
            const storedData = localStorage.getItem("selectedTicket");
            return storedData ? JSON.parse(storedData) : {};
        } catch (error) {
            console.error("Error parsing selected ticket from localStorage:", error);
            return {};
        }
    });
    

    if (!formData) {
        return (
            <div className={styles.errorContainer}>
                <p>No ticket data found. Please fill out the form.</p>
                <button onClick={() => navigate("/details")}>Go Back</button>
            </div>
        );
    }
  return <>
  <NavBar />
  <div className={styles.container}>
    <Headng title="Ready" steps="Step 3/3"/>
    <div  className={styles.progressContainer}>
        <div className={styles.progressBar}>
            <div className={styles.progress}></div>
        </div>
    </div>
    <div className={styles.hContainer}>
        <h2 className={styles.readyHeading}>Your Ticket is Booked!</h2>
        <p className={styles.readyText}>You can download or Check your email for a copy</p>
    </div>
    <div className={styles.bgReady}>
        <div className={styles.backGContainer}>
            <img src={BackG} alt=""  className={styles.backG}/>

        </div>
        <div className={styles.resultContainer}>
            <h2 className={styles.resultHeading}>Techember Fest ”25</h2>
            <p className={styles.resultLocation}>📍 04 Rumens road, Ikoyi, Lagos</p>
            <p className={styles.resultTime}>📅 March 15, 2025 | 7:00 PM</p>
             <div className={styles.resultImgContainer}>
                 {formData.avatar && <img src={formData.avatar} alt="Avatar" className={styles.resultImg}/>}

              </div>
              
             <div className={styles.resultForm}>
                <div className={styles.nameEmailContainer}>
                    <div className={styles.firstRow}>
                        <div   className={styles.firstRowContainer1}>
                            <p className={styles.resultTtle}>Name: </p>
                            <p className={styles.resultText}>{formData.fullName}</p>
                        </div>
                        <div className={styles.firstRowContainer2}>
                            <p className={styles.resultTtle}>Email: </p>
                            <p className={styles.resultText}>{formData.email}</p>
                        </div>
                    </div>
                    <div className={styles.secondRow}>
                        <div className={styles.secondRowContainer1}>
                            <p className={styles.resultTtle}>Ticket Type: </p>
                            <p className={styles.resultText}>{selectedTicket.type || "N/A"}</p>
                        </div>
                        <div  className={styles.secondRowContainer2}>
                            <p className={styles.resultTtle}>Ticket Number: </p>
                            <p className={styles.resultText}>{selectedTicket.quantity || "N/A"}</p>
                        </div>
                    </div>
                </div>
               
                <div>
                    <p className={styles.resultTtle}>Specal Request? </p>

                    <p className={styles.resultText}> {formData.aboutProject}</p>
                </div>
                
             </div>
        </div>
        <div className={styles.barcodeContainer}>
            <img src={Barcode} alt="Bar code" className={styles.barcode} />
        </div>

    </div>
    <div className={styles.buttonContainer}>
            <button className={styles.button1} onClick={() => navigate('/')}>Book Another Ticket</button>
            <button className={styles.button2} >Download Ticket</button>
    </div>
  </div>
  </>
}
