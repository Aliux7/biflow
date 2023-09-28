"use client"
import Header from "@/app/components/header/Header";
import React, { useState } from "react";
import '../../globals.css'
import Footer from "@/app/components/footer/Footer";
import Sidebar from "@/app/components/sidebar/Sidebar";
import styles from "./page.module.css";
import Grid from '@mui/material/Grid';
import ProductCard from "@/app/components/card/ProductCard";
import InputOrder from "@/app/components/form/InputOrder";

const page = () => {

  const [openOverlay, setOpenOverlay] = useState(false);

  return (
    <>
      <Header/>
      <main className={`${styles.shopContainer} section`}>
        <div className={styles.sidebarShopContainer}>
          <Sidebar/>
        </div>
        <div className={styles.contentShopContainer}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={styles.productGridContainer}>
            <Grid>
              <div>
                <ProductCard setOverlay={setOpenOverlay}/>
              </div>
            </Grid>
            <Grid>
              <div>
                <ProductCard setOverlay={setOpenOverlay}/>
              </div>
            </Grid>
            <Grid>
              <div>
                <ProductCard setOverlay={setOpenOverlay}/>
              </div>
            </Grid>
            <Grid>
              <div>
                <ProductCard setOverlay={setOpenOverlay}/>
              </div>
            </Grid>
          </Grid>
        </div>
        {openOverlay && (
          <InputOrder setOverlay={setOpenOverlay}/>
        )}
      </main>
      <Footer/>
    </>
  );
};

export default page;
