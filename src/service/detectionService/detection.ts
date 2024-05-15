/*
 * @Author: wanglinxiang
 * @Date: 2024-05-01 23:33:25
 * @LastEditTime: 2024-05-14 19:56:54
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\detectionService\detection.ts
 */
import { Provide } from '@midwayjs/core';
import path = require('path');
const ort = require('onnxruntime-node');
const { Image } = require('image-js');
const crypto = require('crypto');

// import * as ort from 'onnxruntime-node';
// import ort from 'onnxruntime-node';
// import { onnx } from 'onnxruntime-node';
// import path = require('path');
// import { resolve } from 'path';
// const cv = require('opencv4nodejs');
// const cv = require('node-opencv');
// const testImage = require('./test-file/images/0001059.jpg');
// const fs = require('fs');
@Provide()
export class DetectionService {
  async detect() {
    // 图片文件的路径
    const imagePath = path.join(
      __dirname,
      'test-file',
      'images',
      '0001059.jpg'
    );

    //模型路径
    const modelPath = path.join(__dirname, 'best.onnx');

    try {
      // create a new session and load the specific model.
      const session = await ort.InferenceSession.create(modelPath);

      // 读取图像
      const image = await Image.load(imagePath);

      // 创建一个新的RGB图像，宽度、高度与原始图像相同
      const rgbImage = new Image(image.width, image.height, { kind: 'RGB' });
      // 遍历每个像素，将灰度值应用到所有RGB通道
      for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
          const grayValue = image.getPixelXY(x, y)[0]; // 获取灰度值
          rgbImage.setPixelXY(x, y, [grayValue, grayValue, grayValue]); // 将灰度值应用到所有RGB通道
        }
      }

      // //丢弃gray信道
      // const rgbImage = image.getRGBAData();

      // 假设模型期望输入大小为
      const resizedImage = rgbImage.resize({
        width: 640,
        height: 640,
      });

      console.log(`图片长度:  ${resizedImage.data.length}`);
      console.log({ resizedImage });

      let inputData = new Float32Array(resizedImage.data);

      // 将每个像素值映射到 [0, 1] 范围内
      // for (let i = 0; i < inputData.length; i++) {
      //   inputData[i] = inputData[i] / 255;
      // }

      // const inputName = session.inputNames[0]; // 假设模型只有一个输入
      // const inputShape = session.inputShapes[1]; // 获取输入张量的形状
      const inputTensor = new ort.Tensor(
        'float32',
        inputData,
        [1, 3, 640, 640]
      );

      // prepare feeds. use model input names as keys.
      const feeds = { images: inputTensor };

      // 运行模型
      const outputMap = await session.run(feeds);

      // read from results
      // const dataC = outputMap
      // const outputData = outputTensor.data;

      // 处理输出数据，根据模型的任务和输出格式进行解释

      console.log('Model output:', outputMap);

      // const imageBuffer = fs.readFileSync(imagePath);
      // const imageTensor = new ort.Tensor(imageBuffer);

      // prepare inputs. a tensor need its corresponding TypedArray as data
      // const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      // const dataB = Float32Array.from([
      //   10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
      // ]);
      // const tensorA = new ort.Tensor('float32', dataA, [3, 4]);
      // const tensorB = new ort.Tensor('float32', dataB, [4, 3]);

      // prepare feeds. use model input names as keys.
      // const feeds = { input: imageTensor };

      // feed inputs and run
      // const results = await session.run(feeds);

      // read from results
      // const dataC = results.c.data;
      // console.log(`data of result tensor 'c': ${dataC}`);
      console.log('data', outputMap.output0.cpuData);

      // 获取每一层的输出
      // 获取每一层的输出
      for (const key in outputMap) {
        console.log(`Layer ${key} output:`);
        console.log(outputMap[key].data); // 输出张量的数据
      }

      const save_image = new Image(
        640,
        640,
        outputMap.output0.cpuData
      ).getRGBAData();

      const randomId = crypto.randomBytes(16).toString('hex');
      // 将图像保存为PNG格式
      save_image
        .save(`${randomId}.png`)
        .then(() => {
          console.log('Image saved successfully');
        })
        .catch(error => {
          console.error('Error saving image:', error);
        });

      return {
        image_deteced: outputMap.output0.cpuData,
      };
    } catch (e) {
      console.error(`failed to inference ONNX model: ${e}.`);
    }
  }
}
