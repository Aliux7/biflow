"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../../globals.css'
import AdminHistoryTable from "../../../components/table/AdminHistoryTable";
import AdminHeader from '../../../components/header/AdminHeader';

const page = () => {
  const [animate, setAnimate] = useState(true);
  
  useEffect(() => {
    setAnimate(false);
  }, []); 

  return (
    <div className={styles.bgPosition}>
      <AdminHeader/>
      <div className={`${styles.filteredResult} ${animate ? styles.animate : ""}`}>
          <AdminHistoryTable/>
      </div>
    </div>
  );
};

export default page;
