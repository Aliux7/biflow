'use client';
import React, { useState, useEffect } from 'react';

export default function TimeTable({ formData, handleInputChange }: any) {
  return (
    <div className="mt-3">
      <div className="w-full mx-2 flex-1 svelte-1l8159u">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          {' '}
          Sending Time
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        09:00 - 09:10
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        11:00 - 11:10
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        13:00 - 13:10
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        15:00 - 15:10
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                      >
                        17:00 - 17:10
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Monday
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="mondaySlot"
                          value="09:00-09:10"
                          checked={formData.mondaySlot === '09:00-09:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="mondaySlot"
                          value="11:00-11:10"
                          checked={formData.mondaySlot === '11:00-11:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="mondaySlot"
                          value="13:00-13:10"
                          checked={formData.mondaySlot === '13:00-13:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="mondaySlot"
                          value="15:00-15:10"
                          checked={formData.mondaySlot === '15:00-15:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="mondaySlot"
                          value="17:00-17:10"
                          checked={formData.mondaySlot === '17:00-17:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Tuesday
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="tuesdaySlot"
                          value="09:00-09:10"
                          checked={formData.tuesdaySlot === '09:00-09:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="tuesdaySlot"
                          value="11:00-11:10"
                          checked={formData.tuesdaySlot === '11:00-11:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="tuesdaySlot"
                          value="13:00-13:10"
                          checked={formData.tuesdaySlot === '13:00-13:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="tuesdaySlot"
                          value="15:00-15:10"
                          checked={formData.tuesdaySlot === '15:00-15:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="tuesdaySlot"
                          value="17:00-17:10"
                          checked={formData.tuesdaySlot === '17:00-17:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Wednesday
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="wednesdaySlot"
                          value="09:00-09:10"
                          checked={formData.wednesdaySlot === '09:00-09:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="wednesdaySlot"
                          value="11:00-11:10"
                          checked={formData.wednesdaySlot === '11:00-11:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="wednesdaySlot"
                          value="13:00-13:10"
                          checked={formData.wednesdaySlot === '13:00-13:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="wednesdaySlot"
                          value="15:00-15:10"
                          checked={formData.wednesdaySlot === '15:00-15:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="wednesdaySlot"
                          value="17:00-17:10"
                          checked={formData.wednesdaySlot === '17:00-17:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Thursday
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="thursdaySlot"
                          value="09:00-09:10"
                          checked={formData.thursdaySlot === '09:00-09:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="thursdaySlot"
                          value="11:00-11:10"
                          checked={formData.thursdaySlot === '11:00-11:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="thursdaySlot"
                          value="13:00-13:10"
                          checked={formData.thursdaySlot === '13:00-13:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="thursdaySlot"
                          value="15:00-15:10"
                          checked={formData.thursdaySlot === '15:00-15:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="thursdaySlot"
                          value="17:00-17:10"
                          checked={formData.thursdaySlot === '17:00-17:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Friday
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="fridaySlot"
                          value="09:00-09:10"
                          checked={formData.fridaySlot === '09:00-09:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="fridaySlot"
                          value="11:00-11:10"
                          checked={formData.fridaySlot === '11:00-11:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="fridaySlot"
                          value="13:00-13:10"
                          checked={formData.fridaySlot === '13:00-13:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="fridaySlot"
                          value="15:00-15:10"
                          checked={formData.fridaySlot === '15:00-15:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="fridaySlot"
                          value="17:00-17:10"
                          checked={formData.fridaySlot === '17:00-17:10'}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
