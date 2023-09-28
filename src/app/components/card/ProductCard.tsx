"use client"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import React from "react";
import Image from "next/image";
import product from "../../assets/product/5.jpg"
import './productCard.css'
import { useRouter } from 'next/navigation'

interface ProductComponentProps {
  setOverlay: (value: boolean) => void;
}

export default function ProductCard(props: ProductComponentProps) {

  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 230 }} className="cardProduct">
      <Image src={product} alt="" className="left-image-content"/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tai Flower
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{position: 'relative'}}>
        <div className='productCardButton' onClick={(e) => {props.setOverlay(true)}}>
            Order
        </div>
      </CardActions>
    </Card>
  );
};
