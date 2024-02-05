import React, { useState } from 'react';
import QRSetup from '../components/QRSetup';
import Canvas from '../components/Canvas';
import Uploads from '../components/QRCodeScanner';
import QRSave from '../components/QRSave';
import Info from '../components/info';


const Home = () => {
  const [svg, setSvg] = useState('');
  const [decodedContent, setDecodedContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // 回调函数，用于接收错误消息
  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    // 重置错误消息
  };
  // 创建一个函数来重新初始化 errorMessage
  const resetErrorMessage = () => {
    setErrorMessage('');
  };
  return (
    <>
      <div id='left' className='column'>
        <h1>QRCode Studio</h1>
        <p>生成或转换矢量二维码，直接应用于设计。</p>
        <Uploads onDecode={setDecodedContent} onError={handleErrorMessage} /> {/* 传图解码 */}
        <QRSetup setSvg={setSvg} decodedContent={decodedContent} setDecodedContent={setDecodedContent} /> {/* 二维码设置 */}
      </div>
      <div id='right' className='column'>
        <Canvas svg={svg} /> {/* 二维码显示 */}
        <QRSave svg={svg} /> {/* 二维码保存 */}
      </div>
      <Info errorMessage={errorMessage} onResetErrorMessage={resetErrorMessage}  />
    </>
  );
};

export default Home;
