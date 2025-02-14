import React from 'react'
import styles from '../styles/TicketType.module.css'

export default function TicketType(props) {
  return <>
    <div className={styles.typeContainer}>
        <p className={styles.price}>{props.price}</p>
        <p className={styles.access} >{props.access}</p>
        <p className={styles.quantity}>{props.quantity}</p>
    </div>
  </>
}
