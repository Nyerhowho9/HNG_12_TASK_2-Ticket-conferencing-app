import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import ProgressBar from "../components/ProgressBar";
import TicketType from "../components/TicketType";
import styles from '../styles/Events.module.css'

export default function Event(){
    const navigate = useNavigate();
    

    const [selectedTicket, setSelectedTicket] = useState({
        type: "REGULAR ACCESS",
        price: "Free",
        quantity: "1"
    });
    const [selectedType, setSelectedType] = useState("");

    const [quantity, setQuantity] = useState(() => {
        return localStorage.getItem("ticketQuantity") || "1";
    });

     // Save to local storage when state changes
     useEffect(() => {
        localStorage.setItem("selectedTicket", JSON.stringify(selectedTicket));
        localStorage.setItem("ticketQuantity", quantity);
    }, [selectedTicket, quantity]);

    // Handle ticket selection
    const handleTicketSelect = (type, price) => {
        setSelectedTicket(prev => ({ ...prev, type, price }));
        setSelectedType(type);
        localStorage.setItem("selectedTicket", JSON.stringify({ ...selectedTicket, type, price }));
    };
    
    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        setQuantity(newQuantity);  
        setSelectedTicket(prev => ({ ...prev, quantity: newQuantity }));  
        localStorage.setItem("selectedTicket", JSON.stringify({ ...selectedTicket, quantity: newQuantity }));
    };
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
                    <div >
                        <TicketType price="Free" access="REGULAR ACCESS" quantity="20/52" 
                        isSelected={selectedType === "REGULAR ACCESS"}
                        onSelect={() => handleTicketSelect("REGULAR ACCESS", "Free")}/>
                    </div>
                    <div  className={`${styles.ticketCard} ${selectedType === "VIP ACCESS" ? styles.selected : ""}`} 
                            onClick={() => handleTicketSelect("VIP Access")}>
                        <TicketType price="$150" access="VIP ACCESS" quantity="20/52" 
                        isSelected={selectedType === "VIP ACCESS"}
                        onSelect={() => handleTicketSelect("VIP ACCESS", "$150")}/>
                    </div>
                    <div  
                        onClick={() => handleTicketSelect("VVIP Access")}>
                        <TicketType price="$250" access="VVIP ACCESS" quantity="10/52" 
                         isSelected={selectedType === "VVIP ACCESS"}
    onSelect={() => handleTicketSelect("VVIP ACCESS", "$250")} />
                    </div>
            </div>
            <div className={styles.numberContainer}>
                <label htmlFor="qty" className={styles.numberLabel}>Number of tickets:</label>
                <br />
                <select 
                    name="qty" 
                    id="qty" 
                    className={styles.number} 
                    value={quantity}  // ✅ This ensures the selected value is shown
                    onChange={handleQuantityChange}
                    aria-label="Select number of tickets"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button1} type="submit" 
                onClick={() => navigate('/details', { state: { selectedTicket, quantity } })}
                aria-label="Proceed to enter ticket details"
                >
                     Next
                </button>
                
                <button className={styles.button2} aria-label="Close ticket selection">Close</button>
            </div>
        
        </div>
    </>
}
