/*
 * @Author: wanglinxiang
 * @Date: 2024-05-07 13:30:42
 * @LastEditTime: 2024-05-18 01:13:37
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
import { detectionServer } from '../config/static';

@WSController('/')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @Inject()
  detectPythonService: DetectPythonService;

  @Inject()
  imageService: ImageService;

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
      let result = this.detectPythonService.dataHandle(resultInfo, {
        imageName,
      });
      return result;
    }

    return null;
  }
}
