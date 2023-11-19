'use client';
import React from 'react';
import Image from 'next/image';
import product from '../../assets/product/5.jpg';
import { useRouter } from 'next/navigation';

interface ProductComponentProps {
  id: string;
  name: string;
  desc: string;
  original_price: number;
  discount_price: number;
  img: string;
}

export default function ProductCard(props: ProductComponentProps) {
  const discountPercentage =
    ((props.original_price - props.discount_price) / props.original_price) *
    100;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${props.id}`);
  };

  return (
    <div
      className="mx-auto mt-11 w-full cursor-pointer transform rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <Image
        className="h-48 w-full object-cover object-center"
        width={500}
        height={500}
        src={props.img ? props.img : product}
        alt="Product Image"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-gray-900">{props.name}</h2>
        <p className="mb-2 text-base text-gray-700">{props.desc}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900">
            Rp{props.discount_price}
          </p>
          <p className="text-base  font-medium text-gray-500 line-through">
            Rp{props.original_price}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {discountPercentage.toFixed(0)}% off
          </p>
        </div>
      </div>
    </div>
  );
}
