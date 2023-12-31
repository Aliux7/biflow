'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, fireStore } from '../../../firebase/config';

interface PhoneProps {
  phone: string;
}

interface OrderData {
  id: string;
  senderPhone: string;
  sendingDay: string;
  product: string;
  color: string;
  addons: string;
  orderDate: string;
  quantity: number;
  recipientName: string;
  recipientPhone: string;
  recipientClass: string;
  status: string;
}

export default function DataTable({ phone }: PhoneProps) {
  const [rows, setRows] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(fireStore, 'order'),
            where('sender_phone', '==', phone)
          )
        );
        const data: OrderData[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const dateOrder = new Date(docData.orderDate);
          const formattedDate = dateOrder.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const sendingDays: { day: string; slot: string }[] = [
            { day: 'Monday', slot: 'mondaySlot' },
            { day: 'Tuesday', slot: 'tuesdaySlot' },
            { day: 'Wednesday', slot: 'wednesdaySlot' },
            { day: 'Thursday', slot: 'thursdaySlot' },
            { day: 'Friday', slot: 'fridaySlot' },
          ];

          const sendingDayValues: string[] = sendingDays
            .map((dayInfo) => {
              const slotValue = docData[dayInfo.slot];
              return slotValue !== '' ? `${dayInfo.day} ${slotValue}` : '';
            })
            .filter((dayString) => dayString !== '');

          const sendingDayString =
            sendingDayValues.length > 0 ? sendingDayValues.join(', ') : '';

          return {
            id: doc.id,
            senderPhone: docData.sender_phone,
            product: docData.product,
            color: docData.color,
            addons: docData.addons,
            orderDate: formattedDate,
            quantity: docData.qty,
            recipientName: docData.recipient_name,
            recipientPhone: docData.recipient_phone,
            recipientClass: docData.recipient_class,
            status: docData.status,
            sendingDay: sendingDayString,
          } as OrderData;
        });
        setRows(data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();
  }, [phone]);

  return (
    <div className="p-5 h-[50vh] bg-gray-100 overflow-y-scroll rounded-md">
      <h1 className="text-xl mb-2">Your orders</h1>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                ID.
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Product
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Quantity
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Add Ons
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Color
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, index) => (
              <tr key={index} className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <p className="font-bold text-blue-500">{row.id}</p>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.product}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.quantity}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.addons}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.color}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {rows.map((row, index) => (
          <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div>
              <p className="text-blue-500 font-bold">{row.id}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-gray-500">{row.orderDate}</div>
              <div>
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  {row.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              {row.quantity} {row.addons} {row.color}
            </div>
            <div className="text-sm font-medium text-black">{row.product}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
