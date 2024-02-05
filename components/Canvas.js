// components/Canvas.js
// 二维码展示组件

import React from 'react';

const Canvas = ({ svg }) => {
  // 使用 dangerouslySetInnerHTML 渲染 SVG 字符串
  return (
    <div id='canva' dangerouslySetInnerHTML={{ __html: svg }} />
  );
};

export default Canvas;
