/*
 * @Author: fuzhenghao
 * @Date: 2024-05-01 23:33:25
 * @LastEditTime: 2024-05-13 14:35:22
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\service\detectionService\detection.ts
 */
// import * as ort from 'onnxruntime-node';
import ort from 'onnxruntime-node';
import { Provide } from '@midwayjs/core';
import { resolve } from 'path';
// import cv from 'node-opencv';

// use an async context to call onnxruntime functions.
@Provide()
export class DetectionService {
  async main() {
    try {
      // create a new session and load the specific model.
      //
      // the model in this example contains a single MatMul node
      // it has 2 inputs: 'a'(float32, 3x4) and 'b'(float32, 4x3)
      // it has 1 output: 'c'(float32, 3x3)
      const session = await ort.InferenceSession.create(
        resolve(__dirname, './best.onnx')
      );

      // prepare inputs. a tensor need its corresponding TypedArray as data
      const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const dataB = Float32Array.from([
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
      ]);
      const tensorA = new ort.Tensor('float32', dataA, [3, 4]);
      const tensorB = new ort.Tensor('float32', dataB, [4, 3]);

      // const input = {
      //   // 根据你的模型输入名称和形状修改
      //   inputName: 'your-input-name', // 例如 'data'
      //   shape: [1, 3, 640, 640], // 根据你的模型输入形状修改
      //   data: imageData,
      // };

      // // 读取图片
      // cv.readImage('path/to/your/image.jpg', (err, img) => {
      //   if (err) throw err;

      //   // 使用OpenCV功能，例如转换为灰度图
      //   img.convertGrayscale();

      //   // 显示图片
      //   img.show();

      //   // 保存图片
      //   img.save('path/to/save/image.jpg');
      // });
      // // 执行模型预测
      // const outputs = await session.run({
      //   [input.inputName]: ort.Tensor.fromUint8Array(input.data, input.shape),
      // });

      // 处理模型输出
      // const result = outputs.outputName; // 输出名称
      // console.log(result);

      // prepare feeds. use model input names as keys.
      const feeds = { a: tensorA, b: tensorB };

      // feed inputs and run
      const results = await session.run(feeds);

      // read from results
      const dataC = results.c.data;
      console.log(`data of result tensor 'c': ${dataC}`);
    } catch (e) {
      console.error(`failed to inference ONNX model: ${e}.`);
    }
  }
}
