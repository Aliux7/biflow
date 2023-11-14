"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../../globals.css'
import TransactionTable from "../../../components/table/TransactionTable";
import AdminHeader from '../../../components/header/AdminHeader';
import UpdateOrder from "@/app/components/form/UpdateOrder";

const page = () => {
  const [animate, setAnimate] = useState(true);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    setAnimate(false);
  }, []); 

  const handleSetOverlay = (value: boolean, rowId?: string) => {
    setOpenOverlay(value);
    setSelectedOrderId(rowId || "");
  };

  return (
    <div className={styles.bgPosition}>
      <AdminHeader/>
      <div className={`${styles.filteredResult} ${animate ? styles.animate : ""}`}>
          <TransactionTable setOverlay={handleSetOverlay}/>
      </div>
      
      {openOverlay && (
        <UpdateOrder setOverlay={setOpenOverlay} selectedOrderId={selectedOrderId}/>
      )}
    </div>
  );
};

export default page;
