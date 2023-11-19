'use client';
import React, { useRef, useState, useEffect } from 'react';
import '../../../globals.css';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import Stepper from '@/app/components/stepper/Stepper';
import Image from 'next/image';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { fireStore } from '../../../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import product from '../../../assets/product/5.jpg';
import { useRouter } from 'next/navigation';

export default function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
  const [productData, setProductData] = useState<DocumentData | null>(null);

  const fetchProductData = async () => {
    try {
      const productRef = doc(fireStore, 'product', params.productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        setProductData(productSnapshot.data());
      } else {
        router.push(`/shop`);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      toast.error('Error fetching product data', {
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

  useEffect(() => {
    fetchProductData();
  }, [params.productId]);

  return (
    <div>
      <div className={`relative bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`relative z-10 bg-white lg:max-w-2xl lg:w-full`}>
            <Header />
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="my-8">
          <div className="md:flex">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <Image
                className="h-full w-full rounded-lg object-cover max-w-lg mx-auto border-4 border-pink-300"
                width={500}
                height={500}
                src={productData?.img ? productData?.img : product}
                alt="product"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <div className="mx-2">
                <h1>{productData?.name}</h1>
                <p>{productData?.desc}</p>
                <p className="mb-8">Price: Rp{productData?.discount_price}</p>
              </div>
              <Stepper name={productData?.name} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
