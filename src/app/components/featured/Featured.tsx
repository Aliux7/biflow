'use client';
import React, { useState } from 'react';
import ProductCard from '../card/ProductCard';
import InputOrder from '../form/InputOrder';

const Featured = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  return (
    <section className="category" id="featured">
      <div className="px-4">
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="font-handwritten text-5xl text-center pb-0">
            <a href="/" className="navLogo">
              Featured <span className="text-pink-500">Products</span>
            </a>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
          <ProductCard setOverlay={setOpenOverlay} />
        </div>
        {openOverlay && <InputOrder setOverlay={setOpenOverlay} />}
      </div>
    </section>
  );
};

export default Featured;
