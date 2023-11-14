"use client"
import styles from './page.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, fireStore } from '../../../firebase/config';


interface UpdateOrderProps {
  setOverlay: (value: boolean) => void;
  selectedOrderId: string | null;
}

export default function UpdateOrder(props: UpdateOrderProps) {
    
  const [phone, setPhone] = useState("");
  const [flower, setFlower] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);

    if (props.selectedOrderId) {
      fetchData(props.selectedOrderId);
    }
  }, [props.selectedOrderId]);
  
  const fetchData = async (orderId: string) => {
    try {
      const orderDoc = await getDoc(doc(fireStore, 'order', orderId));
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        // Populate the form fields with existing data
        setPhone(orderData.sender_phone);
        setFlower(orderData.product);
        setQuantity(orderData.qty);
        setName(orderData.recipient_name);
        setRoom(orderData.recipient_class);
        setImageSrc(orderData.image || null);
      } else {
        console.error('Order not found.');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const orderButton = async () => {
    if (props.selectedOrderId) {
      try {
        const orderRef = doc(fireStore, 'order', props.selectedOrderId);
        await updateDoc(orderRef, { status: "Done" });
        window.location.reload();
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };
  

  return (
    <div className="overlay" onClick={(e) => {props.setOverlay(false)}}>
      <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.form}>
          <a href="#" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
          <div className={styles.inputBox}>
            <input type="text" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)} readOnly/>
            <i className="fa-solid fa-phone"></i>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="flower" value={flower} required onChange={(e) => setFlower(e.target.value)} readOnly/>
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="quantity" value={quantity} required onChange={(e) => setQuantity(parseInt(e.target.value, 10))} min={1} readOnly/>
            <i className="fa-solid fa-arrow-up-9-1"></i>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)} readOnly/>
            <i className="fa-solid fa-user"></i>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="room" value={room} required onChange={(e) => setRoom(e.target.value)} readOnly/>
            <i className="fa-solid fa-person-shelter"></i>
          </div>
          <div className={styles.inputBox}>
            {imageSrc && (
              <div className={styles.imageContainer}>
                <img src={imageSrc} alt="Order Image" />
              </div>
            )}
          </div>
          <div className={styles.primaryButton}>
            <input type="submit" value="Update Status" onClick={orderButton}/>
          </div>
        </div>
      </div>
    </div>
  );
};
