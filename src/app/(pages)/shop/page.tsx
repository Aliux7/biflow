'use client';
import Header from '@/app/components/header/Header';
import React, { useState } from 'react';
import '../../globals.css';
import Footer from '@/app/components/footer/Footer';
import ProductCard from '@/app/components/card/ProductCard';
import InputOrder from '@/app/components/form/InputOrder';
import MainHero from '@/app/components/hero/MainHero';
import MainHeroImage from '@/app/components/hero/MainHeroImage';

const page = () => {
  const [openOverlay, setOpenOverlay] = useState(false);

  return (
    <>
      <div className={`relative bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`relative z-10 bg-white lg:max-w-2xl lg:w-full`}>
            <Header />
          </div>
        </div>
      </div>
      <div className={`bg-white grid gap-y-16 overflow-hidden`}>
        <div className="px-4 md:px-8 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
        </div>
        {openOverlay && <InputOrder setOverlay={setOpenOverlay} />}
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
