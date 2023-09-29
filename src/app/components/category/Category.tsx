"use client";
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import category1 from "../../assets/category/home1-category-1.jpg"
import category2 from "../../assets/category/home1-category-2.jpg"
import category3 from "../../assets/category/home1-category-3.jpg"
import category4 from "../../assets/category/home1-category-4.jpg"
import category5 from "../../assets/category/home1-category-5.jpg"
import Image from "next/image";
import './category.css';

const Category = () => {
  
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);
  
  return (
    <section className="category section">
      <div className="container">
        <div className={`left-container ${animate ? "animate" : ""}`}>
          <div style={{width:'100%', height:'99%'}} className="container-image">
            <a href="#">
              <Image src={category1} alt="" className="left-image-content"/>
              <div className="categories-content">
                <h3>Single Flower</h3>
                <h4>404 items</h4>
              </div>
            </a>
          </div>
        </div>
        <div className={`right-container ${animate ? "animate" : ""}`}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div style={{width:'100%', height:'100%'}} className="container-image">
                <a href="#">
                  <Image src={category2} alt="" className="image-content"/>
                  <div className="categories-content">
                    <h3>Bucket Flower</h3>
                    <h4>404 items</h4>
                  </div>
                </a>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{width:'100%', height:'100%'}} className="container-image">
                <a href="#">
                  <Image src={category3} alt="" className="image-content"/>
                  <div className="categories-content">
                    <h3>Vase</h3>
                    <h4>404 items</h4>
                  </div>
                </a>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{width:'100%', height:'100%'}} className="container-image">
                <a href="#">
                  <Image src={category4} alt="" className="image-content"/>
                  <div className="categories-content">
                    <h3>Bear Flower</h3>
                    <h4>404 items</h4>
                  </div>
                </a>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div style={{width:'100%', height:'100%'}} className="container-image">
                <a href="#">
                  <Image src={category5} alt="" className="image-content"/>
                  <div className="categories-content">
                    <h3>Pusing Flower</h3>
                    <h4>404 items</h4>
                  </div>
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Category;
