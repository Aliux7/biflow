"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../globals.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {

  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  const loginButton = () => {
    router.push('/')
  }

  return (
    <div className={styles.bgPosition}>
      <div className="overlay">
        <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`}>
          <div className={styles.form}>
            <a href="/" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
            {/* <h2>Sign In</h2> */}
            <div className={styles.inputBox}>
              <input type="text" name="phone" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
              <i className="fa-regular fa-envelope"></i>
              <span>Phone</span>
            </div>
            <div className={styles.inputBox}>
              <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <i className="fa-solid fa-lock"></i>
              <span>Password</span>
            </div>
            <div className={styles.primaryButton}>
              <input type="submit" value="Login" onClick={loginButton}/>
            </div>
            <p>Not Registered ? <Link href="/register" style={{color: "var(--minor-color)"}}>Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
