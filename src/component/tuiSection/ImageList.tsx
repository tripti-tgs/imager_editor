import React from 'react';

interface ImageListProps {
  images: any[]; // Array of images to display
  onImageChange: (url: string) => void; // Callback function when an image is clicked to change the displayed image
  onImageChangeOriginal: (url: string) => void; // Callback function when "Load Original" button is clicked
}

const ImageList: React.FC<ImageListProps> = ({ images, onImageChange, onImageChangeOriginal }) => {
  return (
    <div>
      {/* Map through the array of images */}
      {images.map((image, index) => (
        <div key={index}>
          {/* Display each image with an onClick event to trigger onImageChange */}
          <img src={image.url} alt={`Image ${index}`} onClick={() => onImageChange(image.url)} />
          
          {/* Button to load the original image, onClick triggers onImageChangeOriginal */}
          <button onClick={() => onImageChangeOriginal(image.url)}>Load Original</button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
