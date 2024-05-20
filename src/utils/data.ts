/*
 * @Author: fuzhenghao
 * @Date: 2024-05-15 17:46:14
 * @LastEditTime: 2024-05-20 10:54:37
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

export const convertImageToBase64String = async filePath => {
  console.log({ filePath });

  // 读取本地图片文件
  let base64Data = null;
  await fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    base64Data = Buffer.from(data).toString('base64'); //将文件数据转换为Base64编码
  });
  return base64Data;
};
