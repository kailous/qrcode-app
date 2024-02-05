import React, { useState } from 'react';

const QRSave = ({ svg, onError, onSuccess }) => {
  // 添加错误状态
  const [error, setError] = useState(null);

  // 下载SVG文件
  const downloadSvg = () => {
    try {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      // 触发成功回调函数并设置成功消息
      onSuccess('SVG文件已成功下载');
    } catch (err) {
      // 发生错误时触发错误处理函数并设置错误状态
      setError('下载SVG时出现错误');
      onError(err);
    }
  };

  // 复制SVG代码到剪贴板
  const copySvg = () => {
    try {
      navigator.clipboard.writeText(svg).then(
        () => {
          // 触发成功回调函数并设置成功消息
          onSuccess('SVG代码已成功复制到剪贴板');
        },
        (err) => {
          // 发生错误时触发错误处理函数并设置错误状态
          setError('复制SVG代码时出现错误');
          onError(err);
        }
      );
    } catch (err) {
      // 发生错误时触发错误处理函数并设置错误状态
      setError('复制SVG代码时出现错误');
      onError(err);
    }
  };

  return (
    <div id="save">
      <button onClick={downloadSvg}>下载SVG</button>
      <button onClick={copySvg}>复制SVG代码</button>

      {/* 显示错误提示 */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default QRSave;
