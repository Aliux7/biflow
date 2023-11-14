"use client"
import React, { useState, useEffect } from "react";
import styles from './page.module.css'
import '../../../globals.css'
import ProductTable from "../../../components/table/ProductTable";
import AdminHeader from '../../../components/header/AdminHeader';
import UpdateOrder from "@/app/components/form/UpdateOrder";
import InputProduct from "@/app/components/form/InputProduct";

const page = () => {
  const [animate, setAnimate] = useState(true);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    setAnimate(false);
  }, []); 

  const handleSetOverlay = (value: boolean, rowId?: string) => {
    setOpenOverlay(value);
    setSelectedProductId(rowId || "");
  };

  return (
    <div className={styles.bgPosition}>
      <AdminHeader/>
      <div className={`${styles.filteredResult} ${animate ? styles.animate : ""}`}>
          <ProductTable setOverlay={handleSetOverlay}/>
          {/* <ProductTable /> */}
      </div>
      
      {openOverlay && (
        <InputProduct setOverlay={setOpenOverlay} selectedProductId={selectedProductId}/>
      )}
    </div>
  );
};

export default page;
