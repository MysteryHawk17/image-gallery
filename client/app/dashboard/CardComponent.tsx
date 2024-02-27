'use client'

import Image from 'next/image';
import React from 'react';
interface ImageCardProps {
  imageUrl: string;
  onDelete: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, onDelete }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <Image width={10} height={10}  className="w-full h-56 object-contain object-center" src={imageUrl} alt="uploaded" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-800 font-bold text-xl">Image Title</h1>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
