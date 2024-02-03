import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = ({ onDecode }) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null); // 使用 useRef 钩子来引用文件输入元素

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
      decodeQRCodeFromFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // 在点击区域时触发文件输入元素的点击事件
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      decodeQRCodeFromFile(files[0]);
    }
  };

  const decodeQRCodeFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          onDecode(code.data); // 调用父组件传入的处理函数
        } else {
          alert('无法识别的二维码');
        }
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ border: dragging ? '2px dashed #000' : '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
    >
      {dragging ? '放到这里' : '点击或拖拽图片到此处'}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // 隐藏文件输入元素
        onChange={handleFileChange}
        ref={fileInputRef} // 将引用附加到文件输入元素
      />
    </div>
  );
};

export default QRCodeScanner;
