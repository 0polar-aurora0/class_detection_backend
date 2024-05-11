/*
 * @Author: fuzhenghao
 * @Date: 2024-04-30 23:20:19
 * @LastEditTime: 2024-05-09 17:35:00
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\configuration.ts
 */
import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as ws from '@midwayjs/ws';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/orm';
// import * as socketio from '@midwayjs/socketio';

@Configuration({
  imports: [egg, ws, orm],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('egg')
  app: egg.Application;

  async onReady() {}
}
