import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageEditor: React.FC = () => {
  const editorRef = useRef<any>(null); // Reference to the AvatarEditor component

  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [border, setBorder] = useState<number>(50);
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const [mirror, setMirror] = useState<{ horizontal: boolean; vertical: boolean }>({
    horizontal: false,
    vertical: false,
  });

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleRotateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotate(parseFloat(e.target.value));
  };

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const imageURL = canvas.toDataURL(); // You can send this to your backend for saving
      console.log('Image saved:', imageURL);
    }
  };

  const handleReset = () => {
    setImage(null);
    setScale(1);
    setRotate(0);
    setPosition({ x: 0.5, y: 0.5 });
    setBorder(50);
    setBorderRadius(0);
    setMirror({ horizontal: false, vertical: false });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={border}
            borderRadius={borderRadius}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={rotate}
            position={position}
            onPositionChange={handlePositionChange}
            // mirror={mirror}
          />
        
          <div>
            <label>Scale:</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
          <div>
            <label>Rotate:</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotate}
              onChange={handleRotateChange}
            />
          </div>
          <div>
            <label>Border Radius:</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            />
          </div>
          {/* <button onClick={() => setMirror({ horizontal: !mirror.horizontal, vertical: mirror.vertical })}>
            Flip Horizontal
          </button>
          <button onClick={() => setMirror({ horizontal: mirror.horizontal, vertical: !mirror.vertical })}>
            Flip Vertical
          </button> */}
          {/* <button onClick={handleReset}>Reset</button>
          <button onClick={handleSave}>Save</button> */}
        </>
      )}
    </div>
  );
};

export default ImageEditor;
