'use client';
import React, { useRef, useState, useEffect } from 'react';
import '../../../globals.css';
import Image from 'next/image';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { fireStore } from '../../../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoname from '../../../assets/logo/logo-name.svg';
import { useRouter } from 'next/navigation';

export default function ProductDetail({
  params,
}: {
  params: { orderId: string };
}) {
  const router = useRouter();
  const [orderData, setorderData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      const productRef = doc(fireStore, 'order', params.orderId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        setorderData(productSnapshot.data());
        setLoading(false);
      } else {
        console.log('Product not found');
        toast.warn('Order not found', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push(`/`);
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
      router.push(`/`);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [params.orderId]);

  const openLinkInNewTab = () => {
    const urlToOpen = `https://api.whatsapp.com/send/?phone=6285887530911&text=Order+%23${params.orderId}%0A%0AHi%2C+I've+Placed+An+Order,+Please+Proceed+My+Payment+Receipt+And+Order+Thanks&type=phone_number&app_absent=0`;
    window.open(urlToOpen, '_blank');
  };

  return (
    <div className="bg-gray-200 print:bg-white md:flex lg:flex xl:flex print:flex md:justify-center lg:justify-center xl:justify-center print:justify-center sf">
      <ToastContainer />
      <div className="lg:w-1/12 xl:w-1/4"></div>
      <div className="w-full bg-white lg:w-full xl:w-2/3 lg:mt-20 lg:mb-20 lg:shadow-xl xl:mt-02 xl:mb-20 xl:shadow-xl print:transform print:scale-90">
        <header className="flex flex-col items-center px-8 pt-20 text-lg text-center bg-white border-t-8 border-pink-700 md:block lg:block xl:block print:block md:items-start lg:items-start xl:items-start print:items-start md:text-left lg:text-left xl:text-left print:text-left print:pt-8 print:px-2 md:relative lg:relative xl:relative print:relative">
          <Image
            alt="logo"
            className="w-3/6 h-auto md:w-1/4 lg:ml-12 xl:ml-12 print:w-1/4 print:px-0 print:py-0o"
            src={logoname}
          />
          <div className="flex flex-col sm:flex-row mt-12 mb-2 ml-0 sm:text-2xl font-bold md:text-3xl lg:text-4xl xl:text-4xl print:text-2xl lg:ml-12 xl:ml-12">
            <div>ORDER</div>
            <div className="text-pink-700 text-md sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
              <span className="mr-4 text-sm"></span> #
              <span id="invoice_id" className="text-gray-500">
                {params.orderId}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:ml-12 xl:ml-12 text-sm sm:text-md print:text-sm">
            <span>Date: {orderData?.orderDate}</span>
          </div>
          {loading ? (
            <div className="px-8 py-2 mt-16 text-3xl font-bold text-yellow-700 border-4 border-yellow-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
              Loading
            </div>
          ) : (
            <div className="px-8 py-2 mt-16 text-3xl font-bold text-pink-700 border-4 border-pink-700 border-dotted md:absolute md:right-0 md:top-0 md:mr-12 lg:absolute lg:right-0 lg:top-0 xl:absolute xl:right-0 xl:top-0 print:absolute print:right-0 print:top-0 lg:mr-20 xl:mr-20 print:mr-2 print:mt-8">
              Order Created
            </div>
          )}

          <div className="flex flex-col m-12 text-center lg:m-12 md:flex-none md:text-left md:relative md:m-0 md:mt-16 lg:flex-none lg:text-left lg:relative xl:flex-none xl:text-left xl:relative print:flex-none print:text-left print:relative print:m-0 print:mt-6 print:text-sm print:hidden">
            <p>
              Take a screenshot of this submitted form or send the order ID and
              send it to our whatsapp here, then we'll contact you for the
              payment! Thankyou~!
            </p>
            <div>Whatsapp: +6285887530911</div>
            <button
              onClick={openLinkInNewTab}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-border hover:text-primary md:py-2 md:text-lg md:px-10"
            >
              Click to Open Whatsapp
            </button>
          </div>
        </header>
        {/* <hr className="border-gray-300 md:mt-8 print:hidden" />
        <div>
          <div
            id="content"
            className="flex justify-center md:p-8 lg:p-20 xl:p-20 print:p-2"
          >
            <table
              className="w-full text-left table-auto print:text-sm"
              id="table-items"
            >
              <thead>
                <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Unit Price</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">
                    Shared Hosting - Simple Plan (Monthly)
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    1
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $2.45
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $2.45
                  </td>
                </tr>
                <tr className="bg-gray-100 print:bg-gray-100">
                  <td className="px-4 py-2 border">
                    Domain Registration - coolstory.bro - (100% Free for First
                    Year)
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    1
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $12.00
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $0.00
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">
                    Dedicated Server - Eco Boost
                    <div className="flex flex-col ml-4 text-xs print:hidden">
                      <span className="flex items-center">
                        Intel® Xeon® Processor E5-1607 v3
                      </span>
                      <span className="uppercase">32GB DDR4 RAM</span>
                      <span>1TB NVMe / Raid 1+0</span>
                      <span>1Gbps Network + CloudFlare DDoS protection</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    1
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $214.99
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $214.99
                  </td>
                </tr>
                <tr className="bg-gray-100 print:bg-gray-100">
                  <td className="px-4 py-2 border ">
                    Dedicated Server - V8 Turbo
                    <div className="flex flex-col ml-4 text-xs print:hidden">
                      <span className="flex items-center">AMD EPYC™ 7702P</span>
                      <span className="uppercase">128GB DDR4 RAM</span>
                      <span>512GB NVMe / Raid 5</span>
                      <span>100Mbit Network + CloudFlare DDoS protection</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    1
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $322.45
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $322.45
                  </td>
                </tr>
                <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                  <td className="invisible"></td>
                  <td className="invisible"></td>
                  <td className="px-4 py-2 text-right border">
                    <span className="flag-icon flag-icon-hu print:hidden"></span>{' '}
                    VAT
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    27%
                  </td>
                </tr>
                <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                  <td className="invisible"></td>
                  <td className="invisible"></td>
                  <td className="px-4 py-2 text-right border">TAX</td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $145.77
                  </td>
                </tr>
                <tr className="text-white bg-gray-700 print:bg-gray-300 print:text-black">
                  <td className="invisible"></td>
                  <td className="invisible"></td>
                  <td className="px-4 py-2 font-extrabold text-right border">
                    Total
                  </td>
                  <td className="px-4 py-2 text-right border tabular-nums slashed-zero">
                    $685.66
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center mb-24 leading-relaxed print:mt-0 print:mb-0">
          <span className="w-64 text-4xl text-center text-black border-b-2 border-black border-dotted opacity-75 sign print:text-lg">
            Csendes
          </span>
          <span className="text-center">Buyer</span>
        </div>
        <footer className="flex flex-col items-center justify-center pb-20 leading-loose text-white bg-gray-700 print:bg-white print:pb-0">
          <span className="mt-4 text-xs print:mt-0">
            Invoice generated on 2020/09/06 17:35
          </span>
          <span className="mt-4 text-base print:text-xs">
            © 2020 BroHosting. All rights reserved.
          </span>
          <span className="print:text-xs">
            US - New York, NY 10023 98-2 W 67th St
          </span>
        </footer> */}
      </div>
      <div className="lg:w-1/12 xl:w-1/4"></div>
    </div>
  );
}
