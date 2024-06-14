import React from 'react';

interface ImageListProps {
  images: any[];
  onImageChange: (url: string) => void;
  onImageChangeOriginal: (url: string) => void;
}


const ImageList: React.FC<ImageListProps> = ({ images, onImageChange, onImageChangeOriginal }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`Image ${index}`} onClick={() => onImageChange(image.url)} />
          <button onClick={() => onImageChangeOriginal(image.url)}>Load Original</button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
