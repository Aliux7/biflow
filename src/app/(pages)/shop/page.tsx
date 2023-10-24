'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import ProductCard from '@/app/components/card/ProductCard';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { fireStore } from '../../../firebase/config';
import '../../globals.css';
import SkeletonProductCard from '@/app/components/card/SkeletonProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
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
    <>
      <div className={`relative bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`relative z-10 bg-white lg:max-w-2xl lg:w-full`}>
            <Header />
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className={`bg-white grid gap-y-16 overflow-hidden`}>
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
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
