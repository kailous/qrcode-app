import React, { useState, useEffect } from 'react';

const Info = ({ errorMessage, onResetErrorMessage }) => {
    // 使用 useState 来管理 className 的状态和按钮的可见性
    const [infoClassName, setInfoClassName] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    // 创建一个独立的函数来设置 className
    const errorOn = () => {
        setInfoClassName('error');
        setIsButtonVisible(true);
        // 设置错误消息
        errorMessage = errorMessage;
    }

    // 创建一个函数来移除错误类名和隐藏按钮
    const errorOff = () => {
        setInfoClassName('');
        setIsButtonVisible(false);
        // 关闭错误消息
        errorMessage = null;
        // 重置错误消息
        onResetErrorMessage();
    };

    // 监听错误消息的变化
    useEffect(() => {
        if (errorMessage) {
            errorOn();
        } else {
            errorOff();
        }
    }, [errorMessage]);

    // 在按钮点击时触发 errorOff 函数
    const handleButtonClick = () => {
        errorOff();
        // 等待1秒后刷新页面
        setTimeout(() => {
            window.location.reload();
        }, 600);
    };

    return (
        <div id='info' className={infoClassName}>
            {/* 其他信息 */}
            {errorMessage && (
                <>
                    {errorMessage}
                    <button onClick={handleButtonClick}>关闭</button>
                </>
            )}
        </div>
    );
};

export default Info;
