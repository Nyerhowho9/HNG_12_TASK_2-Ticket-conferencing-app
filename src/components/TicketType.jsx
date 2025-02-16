import React, {useState} from 'react'
import styles from '../styles/TicketType.module.css'

export default function TicketType({ price, access, quantity, isSelected, onSelect }) {

  return <>
    <div className={`${styles.typeContainer} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect} 
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()} 
      role="button"
      tabIndex={0} 
      aria-label={`Select ${access} ticket for ${price}`} >
        <p className={styles.price}>{price}</p>
        <p className={styles.access} >{access}</p>
        <p className={styles.quantity}>{quantity}</p>
    </div>
  </>
}
