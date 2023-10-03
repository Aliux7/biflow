'use client';
import Header from '@/app/components/header/Header';
import React, { useState } from 'react';
import '../../globals.css';
import Footer from '@/app/components/footer/Footer';
import styles from './page.module.css';
import ProductCard from '@/app/components/card/ProductCard';
import InputOrder from '@/app/components/form/InputOrder';

const page = () => {
  const [openOverlay, setOpenOverlay] = useState(false);

  return (
    <>
      <Header />
      <main className={`${styles.shopContainer} section`}>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-4">
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
        </div>
        {openOverlay && <InputOrder setOverlay={setOpenOverlay} />}
      </main>
      <Footer />
    </>
  );
};

export default page;
