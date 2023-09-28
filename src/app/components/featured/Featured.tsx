"use client";
import React, { useState } from "react";
import './featured.css';
import Grid from '@mui/material/Grid';
import ProductCard from "../card/ProductCard";
import InputOrder from "../form/InputOrder";


const Featured = () => {

  const [openOverlay, setOpenOverlay] = useState(false);
  return (
    <section className="category section">
      <div className="featured-container">
        <div style={{marginBottom: '1rem'}}>
          <h2 className="section-title">
            <a href="/" className="navLogo">Featured <span style={{color:'var(--minor-color)'}}>Products</span></a>
          </h2>
        </div>
        <div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="product-grid-container">
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
      </div>
    </section>
  );
};

export default Featured;
