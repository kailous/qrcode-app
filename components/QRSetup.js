import React, { useEffect, useState } from 'react';


// 假设 setSvg 是一个用于设置 SVG 显示的函数
const QRSetup = ({ setSvg, decodedContent }) => {
  const [formInput, setFormInput] = useState({
    content: ' Rainforest',
    padding: 4,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
    join: false,
    container: "svg-viewbox",
    xmlDeclaration: true,
  });

  // 容错率映射
  const eclDescriptions = {
    L: "低",
    M: "中",
    Q: "较高",
    H: "高"
  };


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
    if (name === "size") {
      setFormInput(formInput => ({
        ...formInput,
        width: value,
        height: value,
      }));
    } else {
      setFormInput(formInput => ({
        ...formInput,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
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
    <>
      <form onSubmit={(e) => e.preventDefault()} className='option column'>
        {/* 内容 */}
        <div className='row'>
          <label>内容:</label>
          <input type="text" name="content" value={formInput.content} onChange={handleInputChange} />
        </div>
        {/* 边距与尺寸 */}
        <div className='range column'>
          <div className='range-text row'>
            <label>边距:</label><span>{formInput.padding}</span>
          </div>
          <div className='range-slider'>
            <input type="range" name="padding" value={formInput.padding} onChange={handleInputChange} min="0" max="10" />
            <div className='slide-rail'>
              <div className='slider' style={{ width: `${formInput.padding * 10}%` }}></div>
            </div>
          </div>
        </div>
        {/* 颜色 */}
        <div className='row'>
          <div className='row'>
            <label>颜色:</label>
            <div className="color row">
              <input type="color" name="color" value={formInput.color} onChange={handleInputChange} />
              <input type="text" name="color" value={formInput.color} onChange={handleInputChange} pattern="^#[0-9A-Fa-f]{6}$" />
            </div>
          </div>
          <div className='row'>
            <label>背景:</label>
            <div className="color row">
              <input type="color" name="background" value={formInput.background} onChange={handleInputChange} />
              <input type="text" name="background" value={formInput.background} onChange={handleInputChange} pattern="^#[0-9A-Fa-f]{6}$" />
            </div>
          </div>
        </div>
        {/* 容错率 */}
        <div className='row'>
          <label>容错:</label>
          <div className='box-radio row'>
            {["L", "M", "Q", "H"].map((ecl) => (
              <label key={ecl} className='custom-radio'>
                <input
                  type="radio"
                  name="ecl"
                  value={ecl}
                  checked={formInput.ecl === ecl}
                  onChange={(e) => setFormInput({ ...formInput, ecl: e.target.value })}
                />
                <span>{eclDescriptions[ecl]}</span>
              </label>
            ))}
          </div>
        </div>
        {/* 拼合路径 */}
        <div className='checkbox-slider row'>
          <input id="my-toggle" type="checkbox" name="join" checked={formInput.join} onChange={handleInputChange} />
          <label htmlFor="my-toggle"></label>
          <p>拼合路径（拼合后可编辑性下降。）</p>
        </div>
        <button type="button" onClick={() => handleSubmit(formInput.content)}>刷新二维码</button>
      </form>
    </>
  );
};

export default QRSetup;
