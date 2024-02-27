"use client";
import Image from "next/image";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const token=localStorage.getItem("token");
    if(token){
      window.location.href="/dashboard";
    }
    else{
      window.location.href="/login";
    }
  }, []);

  return (
    <div className="flex align-centre justify-center h-[100vh] w-full ">BlinkIt Assignment</div> );
}
