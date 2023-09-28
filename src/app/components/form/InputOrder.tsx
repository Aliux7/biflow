"use client"
import styles from './page.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { addDoc, collection } from "firebase/firestore";
import { auth, fireStore } from '../../../firebase/config';


interface ProductComponentProps {
  setOverlay: (value: boolean) => void;
}

export default function InputOrder(props: ProductComponentProps) {
    
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [flower, setFlower] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);
  
  const orderButton = async () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    const orderData = 
    {
      phone: phone,
      flower: flower,
      quantity: quantity,
      dateOrder: formattedDateTime,
      name: name,
      room: room,
      status: "pending"
    };

    await addDoc(collection(fireStore, 'order'), orderData);
    window.location.reload(); 
  }
  return (
    <div className="overlay" onClick={(e) => {props.setOverlay(false)}}>
      <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.form}>
          <a href="#" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
          <div className={styles.inputBox}>
            <input type="text" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
            <i className="fa-solid fa-phone"></i>
            <span>Sender Phone</span>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="flower" value={flower} required onChange={(e) => setFlower(e.target.value)}/>
            <i className="fa-solid fa-leaf"></i>
            <span>Flower Type</span>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="quantity" value={quantity} required onChange={(e) => setQuantity(parseInt(e.target.value, 10))} min={1}/>
            <i className="fa-solid fa-arrow-up-9-1"></i>
            <span>Quantity</span>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)}/>
            <i className="fa-solid fa-user"></i>
            <span>Recipient Name</span>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="room" value={room} required onChange={(e) => setRoom(e.target.value)}/>
            <i className="fa-solid fa-person-shelter"></i>
            <span>Recipient Room</span>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" id="tnc" name="tnc" required value="Bike"/>
            <label htmlFor="tnc"> Terms and Conditions</label>
          </div>


            <div className={styles.primaryButton}>
            <input type="submit" value="Order" onClick={orderButton}/>
            </div>
            {/* <p>Not Registered ? <Link href="/register" style={{color: "var(--minor-color)"}}>Create an account</Link></p> */}
        </div>
      </div>
    </div>
  );
};
