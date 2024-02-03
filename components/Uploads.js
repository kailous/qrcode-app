import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isDragging, setIsDragging] = useState(false); // 新增状态追踪是否正在拖动

  const decodeQRCode = (imageData) => {
    const image = new Image();
    image.onload = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        setScanResult(code.data);
      } else {
        setScanResult('无法识别的二维码');
      }
    };
    image.src = imageData;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => decodeQRCode(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false); // 拖放时更改状态
    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => decodeQRCode(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); // 拖动过程中更改状态
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false); // 离开时更改状态
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{ border: '2px dashed #000', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        {isDragging ? '放到这里' : (scanResult ? '重新选择图片' : '点击或拖拽图片到此处')}
      </label>
      {scanResult && (
        <div>
          <p>扫描结果：{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
