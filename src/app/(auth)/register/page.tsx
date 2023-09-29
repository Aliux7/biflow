"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../globals.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addDoc, collection } from "firebase/firestore";
import { auth, fireStore } from '../../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SnackbarProvider } from "notistack";


const page = () => {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [error, setError] = useState("");
  
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  const registerButton = async () => {
    let isValid = true;
    let errors = "";

    if (email.trim().length < 1) {
      isValid = false;
      errors = "Email must be filled.";
    }else if (password.trim().length < 1) {
        isValid = false;
        errors = "Password must be filled.";
    }else if (confirmPassword.trim().length < 1) {
        isValid = false;
        errors = "Confirm Password must be filled.";
    }else if (confirmPassword !== password) {
        isValid = false;
        errors = "The Password Confirmation does not matching.";
    }
    setError(errors);
    
    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.push('/login')
      }, 3000);
    }else{
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
    }
  }


  
  return (
    <div className={styles.bgPosition}>
      <div className="overlay"></div>
          <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`}>
            <div className={styles.form}>
              <a href="/" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
              {/* <h2>Sign Up</h2> */}
              <div className={styles.inputBox}>
                <input type="text" name="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                <i className="fa-regular fa-envelope"></i>
                <span>Email</span>
              </div>
              <div className={styles.inputBox}>
                <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                <i className="fa-solid fa-lock"></i>
                <span>Password</span>
              </div>
              <div className={styles.inputBox}>
                <input type="password" name="confirmPassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}/>
                <i className="fa-solid fa-lock"></i>
                <span>Confirm Password</span>
              </div>
              <div className={styles.primaryButton}>
                <input type="submit" value="Register" onClick={registerButton}/>
              </div>
              <p>Already a member ? <Link href="/login" style={{color: "var(--minor-color)"}}>Log In</Link></p>
            </div>
          </div>
          
        {showSuccessPopup && (
          <div className={styles.successPopup}>
            <span>Registration successful!</span>
          </div>
        )}

        {showErrorPopup && (
          <div className={styles.errorPopup}>
            <span>{error}</span>
          </div>
        )}
    </div>
  );
};

export default page;
