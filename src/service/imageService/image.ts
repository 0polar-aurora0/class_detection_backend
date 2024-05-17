/*
 * @Author: fuzhenghao
 * @Date: 2024-05-09 15:49:11
 * @LastEditTime: 2024-05-16 23:22:02
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\imageService\image.ts
 */
import path = require('path');
const fs = require('fs');
import { Provide } from '@midwayjs/core';
import { uuid } from '../../utils/uuid';
import { staticPosition } from '../../config/static';

// import { base64Handle } from '../../utils/data';

@Provide()
export class ImageService {
  getImage = async (path: string) => {
    if (!path) {
      console.log('erroe: you must use path to get image');
    }
  };
  saveImage = async (image: any, imageName?: string) => {
    if (!image) {
      console.log('erroe: you must provide an image to save');
    }

    //dist position
    // const imagePathName = path.join(
    //   __dirname,
    //   '../../app/public',
    //   `${imageName || uuid(10)}.jpg`
    // );

    //project position

    const imagePathName = path.join(
      staticPosition,
      `${imageName || uuid(10)}.jpg`
    );
    // console.log({ imagePathName });

    // const base64Image = image.split(';base64,').pop();

    // 将Base64字符串转换为二进制数据
    // const imageBuffer = Buffer.from(base64Image, 'base64');

    // 写入数据到目标文件
    fs.writeFileSync(imagePathName, image, err => {
      if (err) {
        console.error('写入文件时出错：', err);
      }
      // console.log('图片保存成功！');
    });
    return imagePathName;
  };
}
