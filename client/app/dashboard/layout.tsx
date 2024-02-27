'use client'
import React, { useState } from "react";
import Navbar from "./Navbar";
interface Image {
  _id: string;
  userid: string;
  imageurl: string;
}
const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<Image[]>([]);
  return (
    <div>
      <Navbar setImage={setImage} />
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          image,
          setImage,
        })
      )}
    </div>
  );
};

export default DashBoardLayout;
