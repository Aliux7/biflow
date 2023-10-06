"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../../globals.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addDoc, collection } from "firebase/firestore";
import { auth, fireStore } from '../../../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SnackbarProvider } from "notistack";
import { encryptStorage } from "../../../(auth)/login/page"
import TransactionTable from "../../../components/table/TransactionTable";
import AdminHeader from '../../../components/header/AdminHeader';

const page = () => {
  
  const email = encryptStorage.getItem("email")
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  return (
    <div className={styles.bgPosition}>
      <AdminHeader email={email}/>
      <div className={`${styles.filteredResult} ${animate ? styles.animate : ""}`}>
          <TransactionTable status="done"/>
      </div>
    </div>
    // <div>{email}</div>
  );
};

export default page;
