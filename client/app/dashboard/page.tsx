
"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./CardComponent";
import axios from "axios";

interface Image {
  _id: string;
  userid: string;
  imageurl: string;
}

const DashboardPage: React.FC = () => {
  const [image, setImage] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("http://localhost:5000/api/user/all", config);
        setImage(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleDeleteImage = async (index: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const id = image[index]._id;
      const response = await axios.delete(`http://localhost:5000/api/user/delete/${id}`, config);
      setImage(response.data.images);
      console.log("Deleted image at index", index);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-white mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {image.map((imageUrl, index: number) => (
            <ImageCard
              key={index}
              imageUrl={imageUrl.imageurl}
              onDelete={() => handleDeleteImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
