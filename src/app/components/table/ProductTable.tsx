"use client"
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, fireStore } from '../../../firebase/config';

interface ProductData {
  id: string;
  desc: string;
  discountPrice: string;
  img: string;
  name: string;
  originalPrice: number;
}

interface InputProductProps {
  setOverlay: (value: boolean, rowId?: string) => void;
}

export default function DataTable(props: InputProductProps) {
  const [rows, setRows] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(fireStore, 'product')));
        const data: ProductData[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const dateOrder = new Date(docData.orderDate);
          const formattedDate = dateOrder.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric'});
       

          return {
            id: doc.id,
            desc: docData.desc,
            discountPrice: docData.discount_price,
            img: docData.img,
            name: docData.name,
            originalPrice: docData.original_price
          } as ProductData;
        });
        setRows(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (row?: ProductData | null) => {
    if (row) {
      props.setOverlay(true, row.id);
    }else{
      props.setOverlay(true);
    }
  };

  return (
    <div className="p-5 h-[50vh] bg-gray-100 overflow-y-scroll rounded-md">
      <div className="flex justify-between items-center space-x-4">
        <h1 className="text-xl mb-2">Products</h1>
        <button onClick={() => handleRowClick(null)} type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add</button>
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">ID.</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Price</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Discount</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Description</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 cursor-pointer">

          {rows.map((row, index) => (
            <tr className="bg-white" key={index} onClick={() => handleRowClick(row)}>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <p className="font-bold text-blue-500">{row.id}</p>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row.name}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row.originalPrice}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row.discountPrice}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{row.desc}</td>
            </tr>
          ))}
          
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        
        {rows.map((row, index) => (
          <div className="bg-white space-y-3 p-4 rounded-lg shadow" key={index} onClick={() => handleRowClick(row)}>
            <div>
              <p className="text-blue-500 font-bold">{row.id}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              {row.originalPrice} 
              <div className="ml-2">
                <span
                  className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">{row.discountPrice}</span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              {row.desc}
            </div>
            <div className="text-sm font-medium text-black">
            {row.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}