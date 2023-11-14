"use client"
import styles from './page.module.css'
import Link from 'next/link'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, fireStore } from '../../../firebase/config';

interface UpdateProductProps {
  setOverlay: (value: boolean) => void;
  selectedProductId: string | null;
}

export default function InputProduct(props: UpdateProductProps) {
    
  const [flower, setFlower] = useState("");
  const [price, setPrice] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);

    if (props.selectedProductId) {
      fetchData(props.selectedProductId);
    }
  }, []);
  
  const addButton = async () => {
    const productData = 
    {
      name: flower,
      original_price: price,
      discount_price: discount.toString(),
      desc: description,
      img: ""
    };

    await addDoc(collection(fireStore, 'product'), productData);
    props.setOverlay(false)
    window.location.reload(); 
  }

  const fetchData = async (productId: string) => {
    try {
      const orderDoc = await getDoc(doc(fireStore, 'product', productId));
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        setFlower(orderData.name);
        setPrice(orderData.original_price);
        setDiscount(orderData.discount_price);
        setDescription(orderData.desc);
      } else {
        console.error('Order not found.');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const updateButton = async (productId: string) => {
    try {
      await updateDoc(doc(fireStore, 'product', productId), {
        name: flower,
        original_price: price,
        discount_price: discount,
        desc: description,
      });
      props.setOverlay(false)
      window.location.reload(); 
  
      console.log('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  const deleteButton = async (productId: string) => {
    try {
    const productRef = doc(fireStore, 'product', productId);
    await deleteDoc(productRef);

    props.setOverlay(false)
    window.location.reload();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
  }
  
  return (
    <div className="overlay" onClick={(e) => {props.setOverlay(false)}}>
      <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.form}>
          <a href="#" className={styles.navLogo}>Bi<span style={{color:'var(--minor-color)'}}>Flow</span></a>
          <div className={styles.inputBox}>
            <input type="text" name="flower" value={flower} required onChange={(e) => setFlower(e.target.value)}/>
            <i className="fa-solid fa-leaf"></i>
            <span>Flower Name</span>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="price" value={price} required onChange={(e) => setPrice(parseInt(e.target.value, 10))} min={1}/>
            <i className="fa-solid fa-arrow-up-9-1"></i>
            <span>Price</span>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="discount" value={discount} required onChange={(e) => setDiscount(parseInt(e.target.value, 10))} min={0}/>
            <i className="fa-solid fa-arrow-up-9-1"></i>
            <span>Discount</span>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="description" value={description} required onChange={(e) => setDescription(e.target.value)}/>
            <i className="fa-solid fa-person-shelter"></i>
            <span>Description</span>
          </div>


          <div className={styles.primaryButton}>
            {props.selectedProductId === "" || props.selectedProductId === null ? (
              <input type="submit" value="Add Product" onClick={addButton} />
            ) : (
              <div className='flex flex-col items-center cursor-pointer'>
                <input
                  type="submit"
                  value="Update Product"
                  onClick={() => props.selectedProductId && updateButton(props.selectedProductId)}
                />
                <p id="helper-text-explanation" onClick={() => props.selectedProductId && deleteButton(props.selectedProductId)} className="mt-2 text-xl text-gray-500 dark:text-gray-400">Delete Product</p>
              </div>
              
            )}
          </div>


            {/* <p>Not Registered ? <Link href="/register" style={{color: "var(--minor-color)"}}>Create an account</Link></p> */}
        </div>
      </div>
    </div>
  );
};
