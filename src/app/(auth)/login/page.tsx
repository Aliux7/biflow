"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../globals.css'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link'
import { auth, fireStore } from '../../../firebase/config';
// import { EncryptStorage } from 'encrypt-storage';

// export const encryptStorage = new EncryptStorage('binusflower', {
//   encAlgorithm: 'Rabbit',
// });

const page = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  const loginButton = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // encryptStorage.setItem("email", userCredential.user.email);
        
        if (userCredential?.user?.email) {
          // Check if we are running on the client-side before using localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem("email", userCredential?.user?.email);
          }
        } else {
          if (typeof window !== 'undefined') {
            localStorage.setItem("email", "");
          }
        }
        router.push('/admin/order')
      }).catch((error) => {
        setPassword("");
        setEmail("");
      });
  }

  return (
    <div className={styles.bgPosition}>
      <div className="overlay">
        <div className={`${styles.formContainer} ${animate ? styles.animate : ""}`}>
          <div className={styles.form}>
            <a href="/" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
            {/* <h2>Sign In</h2> */}
            <div className={styles.inputBox}>
              <input type="text" name="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
              <i className="fa-regular fa-envelope"></i>
              <span>Email</span>
            </div>
            <div className={styles.inputBox}>
              <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
              <i className="fa-solid fa-lock"></i>
              <span>Password</span>
            </div>
            <div className={styles.primaryButton}>
              <input type="submit" value="Login" onClick={loginButton}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
