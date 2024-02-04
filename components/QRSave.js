import React from 'react';

const QRSave = ({ svg }) => {
  // 下载SVG文件
  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 复制SVG代码到剪贴板
  const copySvg = () => {
    navigator.clipboard.writeText(svg).then(
      () => alert('SVG代码已复制到剪贴板'),
      (err) => alert('复制失败', err)
    );
  };

  return (
    <div id="save">
      <button onClick={downloadSvg}>下载SVG</button>
      <button onClick={copySvg}>复制SVG代码</button>
    </div>
  );
};

export default QRSave;
