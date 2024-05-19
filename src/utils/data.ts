/*
 * @Author: fuzhenghao
 * @Date: 2024-05-15 17:46:14
 * @LastEditTime: 2024-05-15 17:46:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\utils\data.ts
 */
const fs = require('fs');

export function base64Handle(base64Data: any) {
  // 去除base64编码的前缀得到纯编码部分
  let data = base64Data.split(',')[1];
  // 将base64字符串转换为二进制字符串
  let binaryString = atob(data);
  // 将二进制字符串转换为buffer
  let buffer = Buffer.from(binaryString, 'binary');
  return buffer;
}

// Function to convert image to Base64 buffer
export const convertImageToBase64Buffer = filePath => {
  let base64Buffer;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      base64Buffer = null;
    }
    base64Buffer = Buffer.from(data).toString('base64');
  });
  return base64Buffer;
};
