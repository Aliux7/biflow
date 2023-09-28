"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../globals.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addDoc, collection } from "firebase/firestore";
import { auth, fireStore } from '../../../firebase/config';

const page = () => {

  const router = useRouter()
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  const jobData = 
    {
      name: "Preparing Food",
      status: "unfinished",
      category: "Kitchen Staff",
      patient: "",
      room: "",
      bed: "",
      staff: "",
    };

  const registerButton = async () => {
    const newJobRef = await addDoc(collection(fireStore, 'order'), jobData);
    console.log(newJobRef);
    // router.push('/')
  }
  return (
    <div className={styles.bgPosition}>
      <div className="overlay"></div>
      <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`}>
        <div className={styles.form}>
          <a href="/" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
          {/* <h2>Sign Up</h2> */}
            <div className={styles.inputBox}>
              <input type="text" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
              <i className="fa-regular fa-envelope"></i>
              <span>Phone</span>
            </div>
            <div className={styles.inputBox}>
              <input type="date" name="date" value={dob} required onChange={(e) => setDob(e.target.value)}/>
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div className={styles.inputBox}>
              <select name="gender" value={gender} required onChange={(e) => setGender(e.target.value)} style={{margin:'0px'}}>
                <option disabled value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <i className="fa-solid fa-venus-mars"></i>
            </div>
            <div className={styles.inputBox}>
              <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <i className="fa-solid fa-lock"></i>
              <span>Password</span>
            </div>
            <div className={styles.inputBox}>
              <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <i className="fa-solid fa-lock"></i>
              <span>Confirm Password</span>
            </div>
            <div className={styles.primaryButton}>
              <input type="submit" value="Register" onClick={registerButton}/>
            </div>
            <p>Already a member ? <Link href="/login" style={{color: "var(--minor-color)"}}>Log In</Link></p>
          </div>
      </div>
    </div>
  );
};

export default page;
