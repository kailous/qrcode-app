import React, { useState } from 'react';
import QRSetup from '../components/QRSetup';
import Canvas from '../components/Canvas';
import Uploads from '../components/QRCodeScanner';
import QRSave from '../components/QRSave';


const Home = () => {
  const [svg, setSvg] = useState('');
  const [decodedContent, setDecodedContent] = useState(''); // 新增状态

  return (
    <>
      <div id='left' className='column'>
        <h1>生成自定义二维码</h1>
        <Uploads onDecode={setDecodedContent} /> {/* 传图解码 */}
        <QRSetup setSvg={setSvg} decodedContent={decodedContent} setDecodedContent={setDecodedContent} /> {/* 二维码设置 */}
      </div>
      <div id='right' className='column'>
        <Canvas svg={svg} /> {/* 二维码显示 */}
        <QRSave svg={svg} /> {/* 二维码保存 */}
      </div>
    </>
  );
};

export default Home;
