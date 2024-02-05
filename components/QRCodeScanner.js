import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { convertToGrayscale, invertColors, enhanceContrast } from '../utils/imageProcessing';

const QRCodeScanner = ({ onDecode, onError }) => {
  const [dragging, setDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [processingStatus, setProcessingStatus] = useState('');
  const inputFileRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
    setErrorMessage(''); // 清除错误消息
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setProcessingStatus('正在处理图像...');
    const files = event.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
    setErrorMessage(''); // 清除错误消息
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
    setProcessingStatus('转换为灰度图...');
    imageData = convertToGrayscale(imageData);
    setProcessingStatus('反色处理...');
    imageData = invertColors(imageData);
    setProcessingStatus('增强对比度...');
    imageData = enhanceContrast(imageData);

    context.putImageData(imageData, 0, 0);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      onDecode(code.data);
      setProcessingStatus(''); // 清除处理状态
    } else {
      const errorMessage = '无法识别的二维码，请尝试其他图像。'; // 这是示例错误消息
      setProcessingStatus(''); // 清除错误消息
      // 在这里调用传递的 onError 函数
      onError(errorMessage);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      id='drag'
    >
      {dragging ? '可以松手啦' : '点击或拖拽二维码图片到此处'}
      {processingStatus && <div>{processingStatus}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={(e) => {
          setProcessingStatus('正在处理图像...');
          processFile(e.target.files[0]);
        }}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default QRCodeScanner;
