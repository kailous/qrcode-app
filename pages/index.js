import React, { useState } from 'react';
import QRSetup from '../components/QRSetup';
import Canvas from '../components/Canvas';
import Uploads from '../components/QRCodeScanner';
import QRSave from '../components/QRSave';


const Home = () => {
  const [svg, setSvg] = useState('');
  const [decodedContent, setDecodedContent] = useState(''); // 新增状态

  return (
    <div id="body">
      <QRSetup setSvg={setSvg} decodedContent={decodedContent} setDecodedContent={setDecodedContent} />
      <Canvas svg={svg} />
      <QRSave svg={svg} />
      <Uploads onDecode={setDecodedContent} /> {/* 传递解码结果 */}
    </div>
  );
};

export default Home;
