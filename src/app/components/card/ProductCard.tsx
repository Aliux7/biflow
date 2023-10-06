'use client';
import React from 'react';
import Image from 'next/image';
import product from '../../assets/product/5.jpg';
import { useRouter } from 'next/navigation';

interface ProductComponentProps {
  setOverlay: (value: boolean) => void;
}

export default function ProductCard(props: ProductComponentProps) {
  return (
    <div className="mx-auto mt-11 w-full transform rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <Image
        className="h-48 w-full object-cover object-center"
        src={product}
        alt="Product Image"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-gray-900">Tai Flower</h2>
        <p className="mb-2 text-base text-gray-700">
          Product description goes here.
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900">Rp16.000</p>
          <p className="text-base  font-medium text-gray-500 line-throug">
            Rp20000
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            20% off
          </p>
        </div>
      </div>
    </div>
  );
}
