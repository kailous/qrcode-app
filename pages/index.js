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
  const [successMessage, setSuccessMessage] = useState(''); // 新增成功消息状态

  // 回调函数，用于接收错误消息
  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    // 重置错误消息
    setTimeout(() => {
      setErrorMessage('');
    }, 6000); // 3秒后清除成功消息
  };

  // 回调函数，用于接收成功消息
  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    // 重置成功消息
    setTimeout(() => {
      setSuccessMessage('');
    }, 6000); // 3秒后清除成功消息
  };

  // 创建一个函数来重新初始化 errorMessage 和 successMessage
  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <>
      <div id='left' className='column'>
        <h1>QRCode Studio</h1>
        <p>生成或转换矢量二维码，直接应用于设计。</p>
        <Uploads onDecode={setDecodedContent} onError={handleErrorMessage} onSuccess={handleSuccessMessage} /> {/* 传图解码 */}
        <QRSetup setSvg={setSvg} decodedContent={decodedContent} setDecodedContent={setDecodedContent} /> {/* 二维码设置 */}
      </div>
      <div id='right' className='column'>
        <Canvas svg={svg} /> {/* 二维码显示 */}
        <QRSave svg={svg} onSuccess={handleSuccessMessage} /> {/* 二维码保存 */}
      </div>
      <Info errorMessage={errorMessage} successMessage={successMessage} onResetMessages={resetMessages} /> {/* 传递成功消息 */}
    </>
  );
};

export default Home;
