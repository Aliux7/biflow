"use client"
import React from "react";
import { encryptStorage } from "../../(auth)/login/page";

const page = () => {
  
  const email = encryptStorage.getItem("email")
  return (
    <div>{email}</div>
  );
};

export default page;
