import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { convertToGrayscale, invertColors, enhanceContrast } from '../utils/imageProcessing';

const QRCodeScanner = ({ onDecode }) => {
  const [dragging, setDragging] = useState(false);
  const inputFileRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => processImage(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const processImage = (img) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // 图像处理步骤
    imageData = convertToGrayscale(imageData);
    imageData = invertColors(imageData);
    imageData = enhanceContrast(imageData);

    context.putImageData(imageData, 0, 0);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      onDecode(code.data);
    } else {
      alert('无法识别的二维码，请尝试其他图像。');
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{ border: dragging ? '2px dashed #000' : '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
    >
      {dragging ? '放到这里' : '点击或拖拽图片到此处'}
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={(e) => processFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default QRCodeScanner;
