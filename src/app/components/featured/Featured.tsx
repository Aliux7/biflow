'use client';
import React, { useState } from 'react';
import './featured.css';
import ProductCard from '../card/ProductCard';
import InputOrder from '../form/InputOrder';

const Featured = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  return (
    <section className="category section">
      <div className="featured-container">
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="section-title">
            <a href="/" className="navLogo">
              Featured{' '}
              <span style={{ color: 'var(--minor-color)' }}>Products</span>
            </a>
          </h2>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-4">
          <ProductCard setOverlay={setOpenOverlay} />
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
