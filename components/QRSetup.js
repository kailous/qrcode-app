import React, { useEffect, useState } from 'react';

const QRSetup = ({ setSvg, decodedContent, setDecodedContent }) => {
  const [formInput, setFormInput] = useState({
    content: 'Hello World',
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

  // 监听decodedContent变化，并设置表单内容
  useEffect(() => {
    if (decodedContent) {
      setFormInput(formInput => ({ ...formInput, content: decodedContent }));
      // 清除decodedContent以避免重复提交
      setDecodedContent('');
    }
  }, [decodedContent, setDecodedContent]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput(formInput => ({
      ...formInput,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInput),
    });

    if (response.ok) {
      const svg = await response.text();
      setSvg(svg); // 使用 props 中的 setSvg 函数来更新 SVG 状态
    } else {
      alert('Failed to generate QR code.');
    }
  };

  return (
    <div>
      <h1>生成自定义二维码</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">生成二维码</button>
      </form>
    </div>
  );
};

export default QRSetup;
