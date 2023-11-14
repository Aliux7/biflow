'use client';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { fireStore } from '../../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import SkeletonProductCard from '@/app/components/card/SkeletonProductCard';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../card/ProductCard';

const Featured = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(fireStore, 'product');
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setData(documents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error Fetching data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };

    fetchData();
  }, []);
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
        <ToastContainer />
        <div className="px-4 md:px-8 grid grid-cols-1 grid-rows-1 md:grid-cols-3">
          {loading
            ? // Render skeleton cards while loading
              [1, 2, 3].map((index) => <SkeletonProductCard key={index} />)
            : // Render actual product cards once data is loaded
              data.map((document, index) => (
                <ProductCard
                  key={index}
                  id={document.id}
                  name={document.name}
                  desc={document.desc}
                  original_price={document.original_price}
                  discount_price={document.discount_price}
                  img={document.img}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
