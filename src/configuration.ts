/*
 * @Author: wanglinxiang
 * @Date: 2024-04-30 23:20:19
 * @LastEditTime: 2024-05-19 09:59:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\configuration.ts
 */
import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as ws from '@midwayjs/ws';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/orm';
import * as upload from '@midwayjs/upload';
// import * as staticFile from '@midwayjs/static-file';
// import * as socketio from '@midwayjs/socketio';

@Configuration({
  imports: [egg, ws, orm, upload],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('egg')
  app: egg.Application;

  async onReady() {}
}
