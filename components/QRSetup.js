import React, { useEffect, useState } from 'react';

// 假设 setSvg 是一个用于设置 SVG 显示的函数
const QRSetup = ({ setSvg, decodedContent }) => {
  const [formInput, setFormInput] = useState({
    content: '',
    padding: 4,
    width: 256,
    height: 256,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    join: false,
    container: "svg",
    xmlDeclaration: true,
  });

  // 监听 decodedContent 变化，并自动填写表单及提交
  useEffect(() => {
    if (decodedContent) {
      // 自动填写解码内容到表单
      setFormInput(prevFormInput => ({ ...prevFormInput, content: decodedContent }));
      // 这里可以添加自动提交表单的逻辑，或者其他你需要的操作
      handleSubmit(decodedContent); // 假设提交表单的逻辑已经封装在 handleSubmit 中
    }
  }, [decodedContent]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput({
      ...formInput,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (content) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formInput, content }), // 确保使用最新的内容
    });

    if (response.ok) {
      const svg = await response.text();
      setSvg(svg); // 更新 SVG 显示
    } else {
      console.error('Failed to generate QR code.');
    }
  };

  return (
    <div>
      <h1>生成自定义二维码</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>内容:</label>
          <input type="text" name="content" value={formInput.content} onChange={handleInputChange} />
        </div>
        <div>
          <label>边距:</label>
          <input type="number" name="padding" value={formInput.padding} onChange={handleInputChange} />
        </div>
        <div>
          <label>宽度:</label>
          <input type="number" name="width" value={formInput.width} onChange={handleInputChange} />
        </div>
        <div>
          <label>高度:</label>
          <input type="number" name="height" value={formInput.height} onChange={handleInputChange} />
        </div>
        <div>
          <label>颜色:</label>
          <input type="color" name="color" value={formInput.color} onChange={handleInputChange} />
        </div>
        <div>
          <label>背景:</label>
          <input type="color" name="background" value={formInput.background} onChange={handleInputChange} />
        </div>
        <div>
          <label>容错率:</label>
          <select name="ecl" value={formInput.ecl} onChange={handleInputChange}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" name="join" checked={formInput.join} onChange={handleInputChange} />
            拼合（拼合后可编辑性下降。）
          </label>
        </div>
        <button type="button" onClick={() => handleSubmit(formInput.content)}>Generate QR Code</button>
      </form>
    </div>
  );
};

export default QRSetup;
