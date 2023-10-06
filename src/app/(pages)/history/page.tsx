'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import '../../globals.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addDoc, collection } from 'firebase/firestore';
import { auth, fireStore } from '../../../firebase/config';
import Header from '@/app/components/header/Header';
import HistoryTable from '../../components/table/HistoryTable';

const page = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);

  const jobData = {
    name: 'Preparing Food',
    status: 'unfinished',
    category: 'Kitchen Staff',
    patient: '',
    room: '',
    bed: '',
    staff: '',
  };

  const registerButton = async () => {
    const newJobRef = await addDoc(collection(fireStore, 'order'), jobData);
    console.log(newJobRef);
    // router.push('/')
  };

  return (
    <>
      <div className={`relative bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`relative z-10 bg-white lg:max-w-2xl lg:w-full`}>
            <Header />
          </div>
        </div>
      </div>
      <div className={styles.bgPosition}>
        <div
          className={`${styles.formContainer} ${animate ? styles.animate : ''}`}
        >
          <div className={styles.form}>
            <a href="/" className={styles.navLogo}>
              Bi<span style={{ color: 'var(--minor-color)' }}>Flow</span>
            </a>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="phone"
                value={phone}
                required
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowTable(true);
                }}
                onChange={(e) => setPhone(e.target.value)}
              />
              <i className="fa-regular fa-envelope"></i>
              <span>Phone</span>
            </div>
          </div>
          {showTable && (
            <div
              className={`${styles.filteredResult} ${
                animate ? styles.animate : ''
              }`}
            >
              <HistoryTable phone={phone} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
