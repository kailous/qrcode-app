import React, { useState } from 'react';
import QRSetup from '../components/QRSetup';
import Canvas from '../components/Canvas';
import Uploads from '../components/QRCodeScanner';

const Home = () => {
  const [svg, setSvg] = useState('');
  const [decodedContent, setDecodedContent] = useState(''); // 新增状态

  return (
    <div>
      <QRSetup setSvg={setSvg} decodedContent={decodedContent} setDecodedContent={setDecodedContent} />
      <Canvas svg={svg} />
      <Uploads onDecode={setDecodedContent} /> {/* 传递解码结果 */}
    </div>
  );
};

export default Home;
