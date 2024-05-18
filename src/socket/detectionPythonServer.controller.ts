/*
 * @Author: wanglinxiang
 * @Date: 2024-05-07 13:30:42
 * @LastEditTime: 2024-05-19 03:18:21
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\socket\detectionPythonServer.controller.ts
 */
import {
  WSController,
  OnWSConnection,
  Inject,
  OnWSMessage,
  OnWSDisConnection,
} from '@midwayjs/core';
import * as http from 'http';
import { Context } from '@midwayjs/ws';
import { ImageService } from '../service/imageService/image';
import { uuid } from '../utils/uuid';
import { DetectPythonService } from '../service/detectPythonService/fetchGet';
import { get } from '../utils';
import { detectionServer, studentDefaultMock } from '../config/static';
import { ImageDetectService } from '../service/imageDetectService/imageDetect';
import { StudentInfoService } from '../service/studentInfoService/studentInfo';

@WSController('/')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @Inject()
  detectPythonService: DetectPythonService;

  @Inject()
  imageService: ImageService;

  @Inject()
  imageDetectService: ImageDetectService;

  @Inject()
  studentInfoService: StudentInfoService;

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log(`namespace / got a connection ${this.ctx.readyState}`);
    console.log('连接已经建立');
  }

  @OnWSDisConnection()
  async onWSDisConnection(socket: Context, request: http.IncomingMessage) {
    console.log(`${socket}连接建立中断`);
  }

  @OnWSMessage('message')
  async gotMessage(data) {
    let imageName = uuid(10);
    let resultInfo = await this.imageService
      .saveImage(data, imageName)
      .then(imagePathName => {
        const requestURL = `${detectionServer}?path=${imagePathName}`;
        let res = get(requestURL);
        return res;
      });
    console.log({ resultInfo });
    if (resultInfo) {
      //获取处理后的数据
      let result = await this.detectPythonService.dataHandle(
        resultInfo,
        imageName
      );

      //判断学生信息是否存在
      this.studentInfoService
        .ExistsStudentInfo({
          student_id: studentDefaultMock.student_id,
        })
        .then(async exists => {
          console.log({exists});
          //不存在则新增一位学生
          if (!exists) {
            //配置学生信息
            let studentInfo = {
              id: uuid(10),
              student_id: studentDefaultMock.student_id,
              avator: uuid(10),
              detection_face_feature: uuid(10),
            };
            await this.studentInfoService.InsertStudentInfo(studentInfo);
          }
        });

      //将图片和数据存储进数据库并设置默认学生数据
      this.imageDetectService.saveImageDetectResult(
        result,
        studentDefaultMock.student_id
      );
      return result;
    }

    return null;
  }
}
