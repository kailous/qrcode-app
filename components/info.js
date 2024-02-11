import React, { useState, useEffect } from 'react';

const Info = ({ errorMessage, successMessage, onResetMessages }) => {
    // 使用 useState 来管理 className 的状态和按钮的可见性
    const [infoClassName, setInfoClassName] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    // 创建一个函数来设置 className
    const setMessageType = (type) => {
        if (type === 'error') {
            setInfoClassName('error');
            setIsButtonVisible(true);
        } else if (type === 'success') {
            setInfoClassName('success');
            setIsButtonVisible(true);
        }
    };

    // 创建一个函数来移除样式和隐藏按钮，并重置消息
    const clearMessages = () => {
        setInfoClassName('');
        setIsButtonVisible(false);
    };

    // 监听错误消息和成功消息的变化
    useEffect(() => {
        if (errorMessage) {
            setMessageType('error');
            // 如果收到成功消息，等待3秒后清除消息
            setTimeout(() => {
                handleButtonClick();
            }, 6000);
        } else if (successMessage) {
            setMessageType('success');
            // 如果收到成功消息，等待3秒后清除消息
            setTimeout(() => {
                handleButtonClick();
            }, 60000);
        } else {
            clearMessages();
        }
    }, [errorMessage, successMessage]);

    // 在按钮点击时触发 clearMessages 函数
    const handleButtonClick = () => {
        clearMessages();
        // 等待1秒后刷新页面
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div id='info' className={infoClassName}>
            {/* 其他信息 */}
            {(errorMessage || successMessage) && (
                <>
                    {errorMessage && <div className="message">{errorMessage}</div>}
                    {successMessage && <div className="message">{successMessage}</div>}
                    {isButtonVisible && <button onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
  <path stroke="currentColor" strokeLinecap="currentColor" strokeWidth="currentColor" d="m4 4 24 24m0-24L4 28"/>
</svg>
                        </button>}
                </>
            )}
        </div>
    );
};

export default Info;
