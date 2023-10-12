"use client"
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, fireStore } from '../../../firebase/config';
import InputOrder from "../form/InputOrder";

interface OrderData {
  id: string;
  phone: string;
  flower: string;
  quantity: number;
  dateOrder: string; 
  name: string;
  room: string;
  status: string;
}

interface StatusProps {
  status: string;
  setOverlay: (value: boolean) => void;
}
export default function DataTable({ status, setOverlay }: StatusProps) {

  const [rows, setRows] = useState<OrderData[]>([]);

  const columns: GridColDef[] = [
    { field: 'flower', headerName: 'Flower', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'dateOrder', headerName: 'Date Order', width: 200 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'room', headerName: 'Room', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'actions', headerName: '', width: 150,
      renderCell: (params) => { 
        const handleClickUpdate = () => {
          console.log("true");
          setOverlay(true);
        }
        if(params.row.status === "Done"){
          return null;
        }
            
        return (
          <div>
            <button onClick={handleClickUpdate} className="bg-transparent hover:bg-[#ff8dc7] text-[#ff8dc7] font-semibold hover:text-white py-2 px-4 border border-[#ff8dc7] hover:border-transparent rounded">
              Update
            </button>
          </div>
        );
      },
    },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(fireStore, 'order'), where('status', '==', status)));
        const data: OrderData[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const dateOrder = new Date(docData.dateOrder);
          const formattedDate = dateOrder.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
          return {
            id: doc.id,
            phone: docData.phone,
            flower: docData.flower,
            quantity: docData.quantity,
            dateOrder: formattedDate,
            name: docData.name,
            room: docData.room,
            status: docData.status,
          } as OrderData;
        });
        setRows(data);
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }} className='historyTable'>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}