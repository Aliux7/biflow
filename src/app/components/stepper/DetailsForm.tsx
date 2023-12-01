'use client';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getPickupLinesData, getRandomElement } from '@/app/utils/data';
import { Paintable } from '../Paintable/Paintable';
import TimeTable from './TimeTable';

export default function DetailsForm({
  formData,
  handleInputChange,
  errors,
}: any) {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 flex-1 svelte-1l8159u">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
            Your Phone Number<span className="text-red-500"> *</span>
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
            <input
              type="text"
              name="sender_phone"
              id="sender_phone"
              placeholder="08XXXXXXXXXX"
              value={formData.sender_phone}
              onChange={handleInputChange}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="text-red-500 text-xs mt-1">{errors.sender_phone}</div>
    </div>
  );
}
