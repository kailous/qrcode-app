
// 灰度化
export const convertToGrayscale = (imageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        imageData.data[i] = avg; // 红色
        imageData.data[i + 1] = avg; // 绿色
        imageData.data[i + 2] = avg; // 蓝色
    }
    return imageData;
};

// 反色
export const invertColors = (imageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i]; // 红色
        imageData.data[i + 1] = 255 - imageData.data[i + 1]; // 绿色
        imageData.data[i + 2] = 255 - imageData.data[i + 2]; // 蓝色
    }
    return imageData;
};

// 增强对比度
export const enhanceContrast = (imageData) => {
    const factor = (259 * (128 + 255)) / (255 * (259 - 128));
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = truncateColor(factor * (imageData.data[i] - 128) + 128); // 红色
        imageData.data[i + 1] = truncateColor(factor * (imageData.data[i + 1] - 128) + 128); // 绿色
        imageData.data[i + 2] = truncateColor(factor * (imageData.data[i + 2] - 128) + 128); // 蓝色
    }
    return imageData;
};

// 辅助函数，确保颜色值在0到255之间
const truncateColor = (value) => {
    if (value < 0) return 0;
    if (value > 255) return 255;
    return value;
};
