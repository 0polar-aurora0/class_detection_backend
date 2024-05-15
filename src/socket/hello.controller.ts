/*
 * @Author: wanglinxiang
 * @Date: 2024-05-07 13:30:42
 * @LastEditTime: 2024-05-16 01:45:20
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\socket\hello.controller.ts
 */
import {
  WSController,
  OnWSConnection,
  Inject,
  OnWSMessage,
} from '@midwayjs/core';
import { Context } from '@midwayjs/ws';
import * as http from 'http';
import { ImageService } from '../service/imageService/image';
import { uuid } from '../utils/uuid';
import { FetchGetService } from '../service/fetchGetService/fetchGet';

import { get } from '../utils';

// const fetch = require('node-fetch');

const detectionServer = 'http://127.0.0.1:7020/detect';

@WSController('/')
// @WSController('/socket_connection')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @Inject()
  fetchGetService: FetchGetService;

  @Inject()
  imageService: ImageService;

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log(`namespace / got a connection ${this.ctx.readyState}`);
  }

  @OnWSMessage('message')
  async gotMessage(data) {
    // console.log({ data });

    let imageName = uuid(10);
    // console.log({ data });

    let resultInfo = await this.imageService
      .saveImage(data, imageName)
      .then(imagePathName => {
        // console.log({imagePathName});

        const requestURL = `${detectionServer}?path=${imagePathName}`;
        let res = get(requestURL);
        return res;
        // return this.fetchGetService.fetchService(requestURL);
      });
    console.log({ resultInfo });

    return { imageName, resultInfo };
  }
}
