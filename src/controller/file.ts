/*
 * @Author: fuzhenghao
 * @Date: 2024-05-20 16:37:52
 * @LastEditTime: 2024-05-20 17:17:38
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \class_detection_backend\src\controller\file.ts
 */

import { Controller, Get, Inject, Query, SetHeader } from '@midwayjs/core';
import * as fs from 'fs';
import { staticPosition } from '../config/static';

@Controller('/file')
export class FileController {
  @Inject()
  ctx: any;

  @Get('/download')
  @SetHeader('Content-Type', 'image/jpeg')
  async download(@Query() query) {
    console.log({ ctx: this.ctx, query });
    let { filename } = query;

    const filePath = `${staticPosition}/${filename}`; // 文件路径

    // 使用 fs 模块读取文件
    const imageBuffer = fs.readFileSync(filePath);
    // 将文件流作为响应体发送给客户端
    return imageBuffer;
  }
}
