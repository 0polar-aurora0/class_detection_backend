/*
 * @Author: fuzhenghao
 * @Date: 2024-05-07 13:30:42
 * @LastEditTime: 2024-05-09 00:08:15
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

@WSController('/')
// @WSController('/socket_connection')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log(`namespace / got a connection ${this.ctx.readyState}`);
  }

  @OnWSMessage('message')
  async gotMessage(data) {
    console.log({data})
    return { data };
  }
}
