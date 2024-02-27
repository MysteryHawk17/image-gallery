
'use client';
import React, { useState } from "react";
import Link from "next/link";
import ImageUploadModal from "./FileUpload"; 
interface Image {
  _id: string;
  userid: string;
  imageurl: string;
}
interface NavbarProps {
  setImage: React.Dispatch<React.SetStateAction<Image[]>>;
}
const Navbar: React.FC<NavbarProps> = ({setImage}) => {
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:5000/api/user/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image uploaded successfully:", data);
        setImage((prev) => [...prev, data]);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1>
              <Link href="/dashboard">Home</Link>
            </h1>
          </div>
          <div className="flex items-center hover:cursor-pointer">
            <button
              onClick={handleOpenModal}
              className="hover:bg-gray-700 hover:text-white px-3 py-2 mr-9 rounded-md text-sm font-medium"
            >
              Upload Image
            </button>
            <h1>
              <div onClick={handleClick}>Logout</div>
            </h1>
          </div>
        </div>
      </div>
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpload={handleUploadImage}
      />
    </nav>
  );
};

export default Navbar;
